import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:link_forge/models/url_mapping.dart';

import '../services/constants/details.dart';
import '../utils/app_colors.dart';
import '../utils/customSnackbar.dart';

class UrlDetailPage extends StatefulWidget {
  final UrlMapping url;

  const UrlDetailPage({required this.url, super.key});

  @override
  State<UrlDetailPage> createState() => _UrlDetailPageState();
}

class _UrlDetailPageState extends State<UrlDetailPage> {
  late UrlMapping _url;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    _url = widget.url;
  }

  Future<void> _openShortUrl() async {
    final uri = Uri.parse('$baseUrl/${_url.shortUrl}');
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      print('Could not open URL');
    } else {
      await Future.delayed(const Duration(milliseconds: 700));
      // await _refreshFromServer();
    }
  }

  Future<void> _copyToClipboard(String v, [String? label]) async {
    await Clipboard.setData(ClipboardData(text: v));
    CustomSnackBar.show(context, "Copied to clipboard", Icons.check, AppColors.appColor);
  }

  Future<void> _refreshFromServer() async {
    setState(() => loading = true);
    try {
      final all = await urlService.getMyUrls();
      final found = all.firstWhere((e) => e.id == _url.id, orElse: () => _url);
      setState(() => _url = found);
      CustomSnackBar.show(context, "Details refreshed", Icons.check, AppColors.appColor);
    } catch (e) {
      print('Error refreshing: $e');
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('URL Details'), elevation: 0),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child:
            loading
                ? const Center(child: CircularProgressIndicator())
                : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppColors.appColor,
                          width: 2.0, // Set the border width
                        ),
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Original URL:',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 17,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                _url.originalUrl,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 12),
                              Row(
                                children: [
                                  ElevatedButton.icon(
                                    onPressed: _openShortUrl,
                                    icon: const Icon(
                                      Icons.open_in_new,
                                      color: AppColors.appColor,
                                    ),
                                    label: const Text(
                                      'Open Short Url',
                                      style: TextStyle(
                                        color: AppColors.appColor,
                                        fontSize: 11
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 3),
                                  TextButton.icon(
                                    onPressed:
                                        () => _copyToClipboard(
                                          '${baseUrl}/${_url.shortUrl}',
                                          'Short URL',
                                        ),
                                    icon: const Icon(
                                      Icons.copy,
                                      color: AppColors.appColor,
                                    ),
                                    label: const Text(
                                      'Copy URL',
                                      style: TextStyle(
                                        color: AppColors.appColor,
                                          fontSize: 12
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              Row(
                                children: [
                                  Text(
                                    'Clicks: ${_url.clickCount}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              ElevatedButton(
                                onPressed: _refreshFromServer,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppColors.appColor,
                                ),
                                child: const Text(
                                  'Refresh details',
                                  style: TextStyle(color: Colors.white),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
      ),
    );
  }
}
