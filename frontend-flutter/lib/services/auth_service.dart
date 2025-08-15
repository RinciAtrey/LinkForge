import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:link_forge/services/token.dart';

class AuthService {
  final String baseUrl;
  final TokenStorage storage;
  final http.Client _client;

  AuthService({
    required this.baseUrl,
    required this.storage,
    http.Client? client,
  }) : _client = client ?? http.Client();

  Future<void> signup({
    required String username,
    required String password,
    String? email,
  }) async {
    final uri = Uri.parse('$baseUrl/api/auth/public/register');
    final res = await _client.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': username,
        'password': password,
        if (email != null) 'email': email,
      }),
    );

    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception('Signup failed: ${res.statusCode} ${res.body}');
    }
  }

  Future<void> login({
    required String username,
    required String password,
  }) async {
    final uri = Uri.parse('$baseUrl/api/auth/public/login');
    final res = await _client.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );

    if (res.statusCode == 200) {
      final data = jsonDecode(res.body);
      final token =
          data['token'] ?? data['accessToken'] ?? data['access_token'];
      if (token == null) throw Exception('No token in response: ${res.body}');
      await storage.saveAccessToken(token.toString());
    } else {
      // forward server message if present
      String msg =
          res.body.isNotEmpty ? res.body : 'Login failed: ${res.statusCode}';
      throw Exception(msg);
    }
  }

  Future<bool> refreshToken() async {
    final refresh = await storage.readRefreshToken();
    if (refresh == null) return false;

    final uri = Uri.parse('$baseUrl/api/auth/refresh');
    try {
      final res = await _client.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'refreshToken': refresh}),
      );

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        final newToken =
            data['token'] ?? data['accessToken'] ?? data['access_token'];
        final newRefresh = data['refreshToken'] ?? data['refresh_token'];
        if (newToken != null) {
          await storage.saveAccessToken(newToken.toString());
          if (newRefresh != null)
            await storage.saveRefreshToken(newRefresh.toString());
          return true;
        }
      }
    } catch (e) {}
    await storage.clearAll();
    return false;
  }

  Future<void> logout() async {
    await storage.clearAll();
  }

  Future<bool> isLoggedIn() async {
    final token = await storage.readAccessToken();
    return token != null;
  }
}
