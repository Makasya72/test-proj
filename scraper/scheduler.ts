import 'dotenv/config';
import cron from 'node-cron';
import { exec } from 'node:child_process';

console.log('Hourly scraper scheduler started.');

cron.schedule('0 * * * *', () => {
  console.log(`[${new Date().toISOString()}] Running scraper...`);
  exec('npm run scrape', (error, stdout, stderr) => {
    if (error) {
      console.error('Scrape job failed:', error);
      return;
    }
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  });
});
