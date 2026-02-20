/**
 * Type declarations for Google reCAPTCHA v2 (checkbox) client API.
 * @see https://developers.google.com/recaptcha/docs/display
 */
declare global {
  interface Window {
    onRecaptchaLoad?: () => void
    grecaptcha?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; callback?: (token: string) => void }
      ) => number
    }
  }
}

export {}
