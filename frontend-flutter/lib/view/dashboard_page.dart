import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:link_forge/utils/app_colors.dart';
import 'package:link_forge/view/login_page.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:link_forge/models/url_mapping.dart';
import 'package:link_forge/view/url_detail_page.dart';

import '../services/constants/details.dart';
import '../utils/customSnackbar.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  final originalUrlController = TextEditingController();
  List<UrlMapping> urls = [];
  bool loading = false;
  String searchQuery = '';

  @override
  void initState() {
    super.initState();
    _loadUrls();
  }

  @override
  void dispose() {
    originalUrlController.dispose();
    super.dispose();
  }

  Future<void> _loadUrls() async {
    setState(() => loading = true);
    try {
      final list = await urlService.getMyUrls();
      setState(() => urls = list);
    } catch (e) {
      print('Error loading URLs: $e');
    } finally {
      setState(() => loading = false);
    }
  }

  Future<void> _shorten() async {
    final text = originalUrlController.text.trim();
    if (text.isEmpty) {
      _showSnack('Enter a URL to shorten');
      return;
    }
    setState(() => loading = true);
    try {
      final newUrl = await urlService.shorten(text);
      originalUrlController.clear();
      setState(() => urls.insert(0, newUrl));
      _showSnack('Short URL created');
    } catch (e) {
      print('Error creating short url: $e');
    } finally {
      setState(() => loading = false);
    }
  }

  Future<void> _openShortUrl(UrlMapping u) async {
    final uri = Uri.parse('$baseUrl/${u.shortUrl}');
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      _showSnack('Could not open URL');
    } else {
      // small delay then refresh counts
      await Future.delayed(const Duration(milliseconds: 700));
      await _loadUrls();
    }
  }

  Future<void> _copyToClipboard(String value, [String? label]) async {
    await Clipboard.setData(ClipboardData(text: value));
    _showSnack('${label ?? 'Copied'} to clipboard');
  }

  void _showSnack(String msg) {
    if (!mounted) return;
    CustomSnackBar.show(context, msg, Icons.check, AppColors.appColor);
  }

  List<UrlMapping> get _filteredUrls {
    if (searchQuery.isEmpty) return urls;
    final q = searchQuery.toLowerCase();
    return urls
        .where(
          (u) =>
              u.originalUrl.toLowerCase().contains(q) ||
              u.shortUrl.toLowerCase().contains(q),
        )
        .toList();
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 36, 16, 16),
      decoration: const BoxDecoration(
        color: AppColors.appColor,
        borderRadius: BorderRadius.vertical(bottom: Radius.circular(20)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const CircleAvatar(
                radius: 20,
                backgroundColor: Colors.white24,
                child: Icon(Icons.link, color: Colors.white),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Text(
                  'Dashboard',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              IconButton(
                onPressed: _loadUrls,
                icon: const Icon(Icons.refresh, color: Colors.white),
              ),
              IconButton(
                onPressed: () async {
                  await authService.logout();
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (_) => LoginScreen()),
                    (route) => false,
                  );
                },
                icon: const Icon(Icons.logout, color: Colors.white),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            height: 46,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                const Icon(Icons.search, color: Colors.black54),
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      hintText: 'Search original URL',
                    ),
                    onChanged: (v) => setState(() => searchQuery = v),
                  ),
                ),
                if (searchQuery.isNotEmpty)
                  IconButton(
                    onPressed: () => setState(() => searchQuery = ''),
                    icon: const Icon(Icons.clear, size: 20),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: TextField(
                  style: TextStyle(fontSize: 14),
                  controller: originalUrlController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    hintText: 'Paste URL to shorten',
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 14,
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: loading ? null : _shorten,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 18,
                    vertical: 14,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child:
                    loading
                        ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Colors.white,
                          ),
                        )
                        : const Text(
                          'Shorten',
                          style: TextStyle(color: AppColors.appColor),
                        ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime dt) {
    final d = dt.toLocal();
    return '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')} ${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final filtered = _filteredUrls;
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        automaticallyImplyLeading: false,
        elevation: 0,
        backgroundColor: Colors.transparent,
        toolbarHeight: 0,
      ),
      body: Column(
        children: [
          _buildHeader(),
          Expanded(
            child: RefreshIndicator(
              onRefresh: _loadUrls,
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 10,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Your Shortened URLs',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          '${filtered.length} items',
                          style: const TextStyle(color: Colors.black54),
                        ),
                      ],
                    ),
                    SizedBox(height: 17),
                    Divider(height: 2),
                    SizedBox(height: 17),
                    Expanded(
                      child:
                          loading && urls.isEmpty
                              ? const Center(child: CircularProgressIndicator())
                              : filtered.isEmpty
                              ? Center(
                                child: Text(
                                  searchQuery.isEmpty
                                      ? 'No short URLs yet'
                                      : 'No results for "$searchQuery"',
                                ),
                              )
                              : ListView.separated(
                                itemCount: filtered.length,
                                separatorBuilder:
                                    (_, __) => const SizedBox(height: 6),
                                itemBuilder: (context, index) {
                                  final u = filtered[index];
                                  return Container(
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                        color: AppColors.appColor,
                                        width: 2.0,
                                      ),
                                      borderRadius: BorderRadius.circular(10.0),
                                    ),
                                    child: ListTile(
                                      onTap: () async {
                                        final updated = await Navigator.of(
                                          context,
                                        ).push<UrlMapping>(
                                          MaterialPageRoute(
                                            builder:
                                                (_) => UrlDetailPage(url: u),
                                          ),
                                        );
                                        if (updated != null) {
                                          setState(() {
                                            final i = urls.indexWhere(
                                              (m) => m.id == updated.id,
                                            );
                                            if (i >= 0) urls[i] = updated;
                                          });
                                        }
                                      },
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                            horizontal: 12,
                                            vertical: 8,
                                          ),
                                      tileColor: Colors.white,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      title: Text(
                                        u.originalUrl,
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      subtitle: Text(
                                        _formatDate(u.createdDate),
                                        style: const TextStyle(fontSize: 12),
                                      ),
                                      trailing: IconButton(
                                        icon: const Icon(Icons.open_in_new),
                                        onPressed: () => _openShortUrl(u),
                                      ),
                                    ),
                                  );
                                },
                              ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
