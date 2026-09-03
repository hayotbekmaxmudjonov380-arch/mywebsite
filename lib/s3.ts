import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

let s3Client: S3Client | null = null

export function getS3Client(): S3Client {
  if (s3Client) return s3Client

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const region = process.env.AWS_REGION

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'AWS credentials not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY'
    )
  }

  s3Client = new S3Client({
    region: region || 'eu-central-1',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  return s3Client
}

export function getBucketName(): string {
  const bucket = process.env.AWS_S3_BUCKET_NAME
  if (!bucket) {
    throw new Error('AWS_S3_BUCKET_NAME not configured')
  }
  return bucket
}

export async function getDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const s3Client = getS3Client()
  const bucketName = getBucketName()

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  return getSignedUrl(s3Client, command, { expiresIn })
}

export async function fileExists(key: string): Promise<boolean> {
  try {
    const s3Client = getS3Client()
    const bucketName = getBucketName()

    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    })

    await s3Client.send(command)
    return true
  } catch {
    return false
  }
}

export function getProductKey(productId: string, fileName: string): string {
  return `products/${productId}/${fileName}`
}

export function getStoragePath(productId: string): string {
  return `products/${productId}/`
}

export function validateS3Config(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!process.env.AWS_ACCESS_KEY_ID) {
    errors.push('AWS_ACCESS_KEY_ID is not set')
  }
  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    errors.push('AWS_SECRET_ACCESS_KEY is not set')
  }
  if (!process.env.AWS_S3_BUCKET_NAME) {
    errors.push('AWS_S3_BUCKET_NAME is not set')
  }
  if (!process.env.AWS_REGION) {
    errors.push('AWS_REGION is not set (defaulting to eu-central-1)')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
