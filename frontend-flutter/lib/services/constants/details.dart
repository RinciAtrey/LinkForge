import 'package:link_forge/services/token.dart';
import 'package:link_forge/services/url_service.dart';

import '../api_client.dart';
import '../auth_service.dart';

final baseUrl = 'http://(ipaddress):8080';
final tokenStorage = TokenStorage();
final authService = AuthService(baseUrl: baseUrl, storage: tokenStorage);
final authHttpClient = AuthHttpClient(storage: tokenStorage, baseUrl: baseUrl);
final urlService = UrlService(client: authHttpClient);
