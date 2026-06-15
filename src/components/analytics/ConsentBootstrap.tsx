export function ConsentBootstrap() {
  return (
    <script
      id="whitebots-consent-default"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted'
        });
      `
      }}
    />
  );
}
