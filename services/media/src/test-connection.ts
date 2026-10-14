import { getR2Client, ensureBucket, uploadToR2, listMediaObjects, DEFAULT_BUCKET } from './index';

async function testR2() {
  console.log('Testing Cloudflare R2 Connection...');
  const client = getR2Client();

  if (!client) {
    console.error('❌ Failed: S3/R2 client could not be initialized. Check credentials.');
    process.exit(1);
  }

  try {
    console.log(`Checking bucket: ${DEFAULT_BUCKET}...`);
    const bucketResult = await ensureBucket(DEFAULT_BUCKET);
    console.log('Bucket status:', bucketResult);

    const testKey = `test/ping-${Date.now()}.txt`;
    console.log(`Uploading test probe: ${testKey}...`);
    await uploadToR2({
      key: testKey,
      body: 'Cloudflare R2 storage operational for Creator Fitness platform',
      contentType: 'text/plain',
    });
    console.log('✅ Successfully wrote probe object to Cloudflare R2!');

    const objects = await listMediaObjects('test/');
    console.log(`Found ${objects.length} object(s) with prefix 'test/' in R2.`);
    console.log('🎉 Cloudflare R2 S3 API verification SUCCESSFUL!');
  } catch (err: any) {
    console.error('❌ Cloudflare R2 verification error:', err.message || err);
    process.exit(1);
  }
}

testR2();
