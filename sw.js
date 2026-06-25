// tamoyan-apps（ポータル）- ネットワークファースト方式のService Worker
// 常に「最新」を優先する設計。キャッシュは「オフライン時の保険」としての扱いで、
// オンライン時は必ずネットワークから取得する。
const CACHE_VERSION = "tamoyan-apps-v1";
const ASSETS = [
  "./index.html",
  "./icon-192.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// network-first：オンラインなら常に最新を取りに行き、取れた分だけキャッシュを更新する
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
