import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenStorage {
  final _storage = const FlutterSecureStorage();
  static const _keyAccess = 'ACCESS_TOKEN';
  static const _keyRefresh = 'REFRESH_TOKEN';

  Future<void> saveAccessToken(String token) => _storage.write(key: _keyAccess, value: token);
  Future<String?> readAccessToken() => _storage.read(key: _keyAccess);
  Future<void> deleteAccessToken() => _storage.delete(key: _keyAccess);

  Future<void> saveRefreshToken(String token) => _storage.write(key: _keyRefresh, value: token);
  Future<String?> readRefreshToken() => _storage.read(key: _keyRefresh);
  Future<void> deleteRefreshToken() => _storage.delete(key: _keyRefresh);

  Future<void> clearAll() => _storage.deleteAll();
}
