# Auth Starter (Expo + Supabase)

## Install
npx expo install @supabase/supabase-js react-native-url-polyfill @react-native-async-storage/async-storage react-native-safe-area-context

## Setup
1. Create `.env` from `.env.example`
2. Get URL + anon key from Supabase Dashboard → Project Settings → API
3. Supabase Dashboard → Authentication → Providers → Email:
   - Enable Email provider
   - **Disable "Confirm email"** for dev (or manually confirm each user)
4. Restart Expo after any env change: `npx expo start -c`

## Run
npx expo start -c

## Troubleshooting
- `crypto.getRandomValues is not a function` → missing `react-native-url-polyfill/auto` import at top of `lib/supabase.ts`
- Session lost on reload → check `detectSessionInUrl: false` and AsyncStorage is wired
- "Email not confirmed" → disable Confirm email in Supabase dashboard
- `network request failed` → wrong URL/key in `.env`, or stale cache (`expo start -c`)