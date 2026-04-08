import { cookies } from 'next/headers';
import { verifyJwt } from './jwt';

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    return verifyJwt(token);
  } catch {
    return null;
  }
}
