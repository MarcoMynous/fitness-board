import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });
dotenv.config({ path: '../.env' });
dotenv.config();

const endpoint = process.env.S3_ENDPOINT;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
export const DEFAULT_BUCKET = process.env.S3_BUCKET || 'fitness-media';

export function getR2Client(): S3Client | null {
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Ensures the target R2 bucket exists, creating it if necessary.
 */
export async function ensureBucket(bucketName: string = DEFAULT_BUCKET) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 client is not configured.');
  }

  try {
    await client.send(new HeadBucketCommand({ Bucket: bucketName }));
    return { exists: true, created: false };
  } catch (err: any) {
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      await client.send(new CreateBucketCommand({ Bucket: bucketName }));
      return { exists: true, created: true };
    }
    throw err;
  }
}

/**
 * Uploads a file buffer or stream directly to Cloudflare R2
 */
export async function uploadToR2({
  key,
  body,
  contentType,
  bucket = DEFAULT_BUCKET,
}: {
  key: string;
  body: Buffer | Uint8Array | Blob | string;
  contentType: string;
  bucket?: string;
}) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 storage credentials are not configured.');
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await client.send(command);

  return {
    success: true,
    key,
    bucket,
  };
}

/**
 * Generates a presigned URL allowing clients/admins to upload large media
 * (such as HD exercise videos or high-res photography) directly to R2.
 */
export async function createPresignedUploadUrl({
  key,
  contentType,
  bucket = DEFAULT_BUCKET,
  expiresInSeconds = 3600,
}: {
  key: string;
  contentType: string;
  bucket?: string;
  expiresInSeconds?: number;
}) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 credentials are not configured.');
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: expiresInSeconds });

  return {
    uploadUrl,
    key,
    bucket,
    expiresInSeconds,
  };
}

/**
 * Generates a temporary secure presigned download/viewing URL for protected media.
 */
export async function createPresignedDownloadUrl({
  key,
  bucket = DEFAULT_BUCKET,
  expiresInSeconds = 7200,
}: {
  key: string;
  bucket?: string;
  expiresInSeconds?: number;
}) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 credentials are not configured.');
  }

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const downloadUrl = await getSignedUrl(client, command, { expiresIn: expiresInSeconds });
  return downloadUrl;
}

/**
 * Lists objects in the bucket for media management
 */
export async function listMediaObjects(prefix: string = '', bucket: string = DEFAULT_BUCKET) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 credentials are not configured.');
  }

  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  });

  const response = await client.send(command);
  return response.Contents || [];
}
