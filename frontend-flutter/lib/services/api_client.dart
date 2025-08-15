import 'dart:convert';
import 'package:http/http.dart' as http;
import 'token.dart';

class AuthHttpClient {
  final http.Client _inner;
  final TokenStorage _storage;
  final String baseUrl;

  AuthHttpClient({
    http.Client? inner,
    required TokenStorage storage,
    required this.baseUrl,
  }) : _inner = inner ?? http.Client(),
       _storage = storage;

  Future<http.Response> get(
    String path, {
    Map<String, String>? headers,
    Map<String, String>? params,
  }) async {
    final uri = Uri.parse('$baseUrl$path').replace(queryParameters: params);
    final merged = await _addAuthHeader(headers);
    return _inner.get(uri, headers: merged);
  }

  Future<http.Response> post(
    String path, {
    Map<String, String>? headers,
    Object? body,
    Encoding? encoding,
  }) async {
    final uri = Uri.parse('$baseUrl$path');
    final merged = await _addAuthHeader(headers);
    return _inner.post(uri, headers: merged, body: body, encoding: encoding);
  }

  Future<http.Response> put(
    String path, {
    Map<String, String>? headers,
    Object? body,
    Encoding? encoding,
  }) async {
    final uri = Uri.parse('$baseUrl$path');
    final merged = await _addAuthHeader(headers);
    return _inner.put(uri, headers: merged, body: body, encoding: encoding);
  }

  Future<http.Response> delete(
    String path, {
    Map<String, String>? headers,
    Object? body,
    Encoding? encoding,
  }) async {
    final uri = Uri.parse('$baseUrl$path');
    final merged = await _addAuthHeader(headers);
    return _inner.delete(uri, headers: merged, body: body, encoding: encoding);
  }

  Future<Map<String, String>> _addAuthHeader(
    Map<String, String>? headers,
  ) async {
    final token = await _storage.readAccessToken();
    final base =
        headers != null
            ? Map<String, String>.from(headers)
            : <String, String>{};
    base['Content-Type'] = base['Content-Type'] ?? 'application/json';
    if (token != null) {
      base['Authorization'] = 'Bearer $token';
    }
    return base;
  }

  void close() => _inner.close();
}
