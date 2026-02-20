/**
 * utils/inquiryConstant.ts
 *
 * Contact form configuration and validation messages
 *
 * Features:
 * - Form validation error messages
 * - Google Forms integration configuration
 * - Form field definitions and placeholders
 * - Success and error message handling
 *
 * Dependencies:
 * - Google Forms API
 * - Environment variables for form configuration
 *
 * Required environment variables:
 * - GOOGLE_FORM: Google Form ID
 */

// Validation and alert messages for contact form
export const alertMessageText = {
  noName: 'お名前を入力してください',
  noEmail: 'メールアドレスを入力してください',
  noPhone: 'お電話番号を入力してください',
  noMessage: 'お問い合わせ内容を入力してください',
  invalidEmail: 'メールアドレスをご確認ください',
  invalidPhone: 'お電話番号をご確認ください',
  sendPlease: '送信ボタンを押してください',
  thanksInquiry: 'お問い合わせありがとうございました',
  confirmEmail: 'メールをご確認ください。\n確認メールが届かない場合はもう一度お問い合わせください。',
  sendError: '送信エラー',
  formNotConfigured: 'お問い合わせフォームは現在利用できません。しばらく経ってからお試しください。',
  completeRecaptcha: '「私はロボットではありません」の確認を完了してください。',
}

/** true when GOOGLE_FORM is set (form submission will work) */
const googleFormId = (typeof process.env.GOOGLE_FORM === 'string' && process.env.GOOGLE_FORM.trim()) || ''
export const isFormConfigured = googleFormId.length > 0

// Google Forms configuration and field definitions
export const myForm = {
  /** Form action URL; use '#' when env is missing to avoid submitting to undefined */
  url: isFormConfigured ? `https://docs.google.com/forms/u/0/d/e/${googleFormId}/formResponse` : '#',
  familyName: {
    label: "姓",
    placeholder: '青海',
    number: "entry.803558779",
  },
  firstName: {
    label: "名",
    placeholder: '陽葵',
    number: "entry.1764860706",
  },
  email: {
    label: "メールアドレス",
    placeholder: 'himari_aomi@sole-e-mare.jp',
    number: "entry.1965966452",
  },
  phone: {
    label: "お電話番号",
    placeholder: '09012345678',
    number: "entry.1268666368",
  },
  message: {
    label: "お問い合わせ内容",
    placeholder: alertMessageText.noMessage,
    number: "entry.282686394",
  }
}
