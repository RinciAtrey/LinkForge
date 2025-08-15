import 'dart:convert';

import 'package:link_forge/models/url_mapping.dart';

import 'api_client.dart';

class UrlService {
  final AuthHttpClient client;

  UrlService({required this.client});

  Future<UrlMapping> shorten(String originalUrl) async {
    final body = jsonEncode({'originalUrl': originalUrl});
    final res = await client.post('/api/urls/shorten', body: body);
    if (res.statusCode == 200 || res.statusCode == 201) {
      final data = jsonDecode(res.body);
      return UrlMapping.fromJson(data);
    } else {
      throw Exception('Error shortening URL: ${res.statusCode} ${res.body}');
    }
  }

  Future<List<UrlMapping>> getMyUrls() async {
    final res = await client.get('/api/urls/myurls');
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body) as List<dynamic>;
      return data.map((e) => UrlMapping.fromJson(e as Map<String, dynamic>)).toList();
    } else {
      throw Exception('Error fetching urls: ${res.statusCode} ${res.body}');
    }
  }

  Future<Map<String, int>> getTotalClicks({required String startDate, required String endDate}) async {
    final res = await client.get('/api/urls/totalClicks', params: {'startDate': startDate, 'endDate': endDate});
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      final Map<String, int> out = {};
      data.forEach((k, v) {
        out[k] = v is int ? v : int.parse(v.toString());
      });
      return out;
    } else {
      throw Exception('Error fetching total clicks: ${res.statusCode} ${res.body}');
    }
  }
}
