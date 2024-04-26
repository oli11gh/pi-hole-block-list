const fs = require('fs');
const https = require('https');
const path = require('path');

const sourceFiles = [
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/ads/blocklistproject.ads.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/ads/kboghdady.youtubelist.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/ads/yoyo.AdsTrackersEtc.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/0Zinc.easylist.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/firebog.AdguardDNS.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/firebog.Admiral.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/firebog.Easylist.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/frogeye.firstparty-trackers-hosts.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.adguard_mobile_host.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/mitchellkrogza.Stop.Google.Analytics.Ghost.Spam-INACTIVE.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/neodevpro.neodevhost.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/developerdan.amp-hosts-extended.txt',
  'https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts',
  'https://v.firebog.net/hosts/Easyprivacy.txt',
  'https://v.firebog.net/hosts/Prigent-Ads.txt',
  'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts',
  'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt'], target: path.join('hosts', 'ads.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/ads/DandelionSprout.GameConsoleAdblockList.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/adaway.hosts.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/anudeepND.adservers.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.youtube.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/firebog.Prigent-Ads.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.Ad_filter_list_by_Disconnect.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.SmartTV_ads.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/ente-dev.google-amp-hosts.txt',
  'https://blocklistproject.github.io/Lists/ads.txt',
  'https://blocklistproject.github.io/Lists/tracking.txt',
  'https://adaway.org/hosts.txt',
  'https://v.firebog.net/hosts/AdguardDNS.txt',
  'https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt',
  'https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/hoshsadiq.adblock-nocoin-list.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/justdomains.adguarddns.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.adguard_host.txt'], target: path.join('hosts', 'ads-2.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/ads/jerryn70.GoodbyeAds.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/craiu.mobiletrackers.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/crazy-max.WindowsSpyBlocker.hosts-spy.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/disconnectme.simple_ad.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/r-a-y.AdguardMobileAds.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/0Zinc.easyprivacy.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/ente-dev.tv.txt',
  'https://v.firebog.net/hosts/Admiral.txt',
  'https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt',
  'https://v.firebog.net/hosts/Easylist.txt',
  'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext',
  'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.easy_privacy_host.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/notracking.hostnames.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/oisd.big.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/r-a-y.AdguardApps.txt',
  'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/hostfile.txt'], target: path.join('hosts', 'ads-3.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.phishing.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/Dogino.Discord-Phishing-URLs-phishing.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/phishingArmy.phishing_army_blocklist_extended.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/RPiList-Phishing.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/phishing.txt',
  'https://blocklistproject.github.io/Lists/gambling.txt',
  'https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt',
  'https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt',
  'https://v.firebog.net/hosts/Prigent-Crypto.txt',
  'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/durablenapkin.scamblocklist.txt',
  'https://blocklistproject.github.io/Lists/scam.txt',
  'https://hole.cert.pl/domains/v2/domains_hosts.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.hostfile.txt'], target: path.join('hosts', 'gen.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/AssoEchap.stalkerware-indicators.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/bigdargon.hostsVN.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/DandelionSprout-AntiMalwareHosts.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/digitalside.latestdomains.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/disconnectme.simple_malvertising.txt',
  'https://bitbucket.org/ethanr/dns-blacklists/raw/8575c9f96e5b4a1308f2f12394abd86d0927a4a0/bad_lists/Mandiant_APT1_Report_Appendix_D.txt',
  'https://phishing.army/download/phishing_army_blocklist_extended.txt',
  'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt',
  'https://v.firebog.net/hosts/RPiList-Malware.txt',
  'https://v.firebog.net/hosts/RPiList-Phishing.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/PolishFiltersTeam.KADhosts.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/FadeMind.add.2o7Net.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/FadeMind.add.Risk.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/FadeMind.add.Spam.txt'], target: path.join('hosts', 'gen-2.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/firebog.Prigent-Crypto.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/malware-filter.urlhaus-filter-hosts-online.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/quidsup.notrack-malware.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/RPiList-Malware.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/Spam404.main-blacklist.txt',
  'https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt',
  'https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts',
  'https://urlhaus.abuse.ch/downloads/hostfile/',
  'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt',
  'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/FadeMind.UncheckyAds.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/StevenBlack.hosts.txt',
  'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts',
  'https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt'], target: path.join('hosts', 'gen-3.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/malicious/blocklistproject.malware.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/main.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/main-2.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/reported-by-norton.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/web-attacks.txt',
  'https://v.firebog.net/hosts/static/w3kbl.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/blocklistproject.fraud.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/firebog.w3kbl.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.gambling.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/MajkiIT.gambling-hosts.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/Snota418.Crypto-streams.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/abuse.urlhaus.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/malicious/blocklistproject.abuse.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.redirect.txt'], target: path.join('hosts', 'gen-4.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.ransomware.txt',
  'https://blocklistproject.github.io/Lists/malware.txt',
  'https://blocklistproject.github.io/Lists/phishing.txt',
  'https://blocklistproject.github.io/Lists/ransomware.txt',
  'https://blocklistproject.github.io/Lists/fraud.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/gambling.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/RPiList.Spam-Mails.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/stopforumspam.toxic_domains_whole.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.scam.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/Dogino.Discord-Phishing-URLs-scam.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/useless-websites.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/deathbybandaid.ParsedBlacklists-easylist-fr.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/deathbybandaid.ParsedBlacklists-easylist.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/r-a-y.AdguardMobileSpyware.txt'], target: path.join('hosts', 'gen-5.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.drugs.txt',
  'https://blocklistproject.github.io/Lists/piracy.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/developerdan.hate-and-junk-extended.txt'], target: path.join('hosts', 'illegal.txt') },
  { urls: ['https://blocklistproject.github.io/Lists/crypto.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.redirect.txt'], target: path.join('hosts', 'other-junk.txt') },
  { urls: ['https://raw.githubusercontent.com/oli11gh/pi-hole-block-list/main/myblocklist.txt',
  'https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser'], target: path.join('hosts', 'other.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/blocklistproject.porn.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/chadmayfield.pi_blocklist_porn_all.txt'], 
  target: path.join('hosts', 'porn.txt') },
  { urls: ['https://blocklist.sefinek.net/generated/0.0.0.0/forks/4skinSkywalker.Anti-Porn.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/StevenBlack.fakenews-gambling-porn.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/cbuijs.adult-domains.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/deathbybandaid.CountryCodesLists-France.txt'], 
  target: path.join('hosts', 'porn-2.txt') },
  { urls: ['https://blocklistproject.github.io/Lists/porn.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/oisd.nsfw.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/porn.txt',
  'https://blocklist.sefinek.net/generated/0.0.0.0/forks/Sinfonietta.pornography-hosts.txt'], 
  target: path.join('hosts', 'porn-3.txt') },
];

const whitelistUrl = 'https://raw.githubusercontent.com/oli11gh/pi-hole-block-list/main/whitelist.txt';

async function getData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      console.error('error host ' + url + ': ' + err.message);
      resolve('');
    });
  });
}

async function getWhitelist() {
  let data = await getData(whitelistUrl);
  return new Set(data.split('\n').map(line => line.trim()).filter(line => line !== ''));
}

async function updateFilesAndCommit() {
  let whitelist = await getWhitelist();
  for (let fileSet of sourceFiles) {
    try {
      let content = '';
      for (let url of fileSet.urls) {
        let data = await getData(url);
        if (data.trim() !== '') {
          content += data + '\n';
        }
      }
      let uniqueLines = new Set();
      content.split('\n').forEach((line) => {
        if (line.trim() !== '' && !line.startsWith('#') && !whitelist.has(line)) {
          uniqueLines.add(line);
        }
      });
      let finalContent = [...uniqueLines].join('\n') + '\n';
      fs.writeFileSync(fileSet.target, finalContent);
      console.log('Created hosts file ' + fileSet.target);
    } catch (err) {
      console.error('error: ' + err.message);
    }
  }
}

updateFilesAndCommit();
