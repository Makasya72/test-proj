import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-md gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">Use admin / admin123 to access the catalog.</p>
      </div>
      <AuthForm />
    </div>
  );
}
