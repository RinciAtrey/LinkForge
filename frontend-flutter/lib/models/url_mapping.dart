class UrlMapping {
  final int id;
  final String originalUrl;
  final String shortUrl;
  final int clickCount;
  final DateTime createdDate;
  final String username;

  UrlMapping({
    required this.id,
    required this.originalUrl,
    required this.shortUrl,
    required this.clickCount,
    required this.createdDate,
    required this.username,
  });

  factory UrlMapping.fromJson(Map<String, dynamic> json) {
    return UrlMapping(
      id: json['id'] is int ? json['id'] : int.parse(json['id'].toString()),
      originalUrl: json['originalUrl'] ?? '',
      shortUrl: json['shortUrl'] ?? '',
      clickCount: json['clickCount'] is int ? json['clickCount'] : int.parse(json['clickCount'].toString()),
      createdDate: DateTime.parse(json['createdDate']),
      username: json['username'] ?? '',
    );
  }
}
