/**
 * InquiryBody.tsx
 *
 * Contact form component
 *
 * Features:
 * - Contact form with validation
 * - Real-time form validation
 * - Email and phone number validation (shared utils)
 * - Form submission handling
 * - Success/error message display (Snackbar, per-field a11y)
 * - Responsive design for different screen sizes
 *
 * Dependencies:
 * - Material-UI components (Button, TextField, Snackbar, Icons)
 * - inquiryConstant for form data and messages
 * - emailValidation (isValidEmail, isValidPhone)
 * - InquiryTitle component for section title
 */

import React, { CSSProperties, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button, Snackbar, TextField } from '@mui/material'
import AccountIcon from '@mui/icons-material/AccountCircle'
import Edit from '@mui/icons-material/Edit'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/LocalPhone'
import Link from 'next/link'
import Script from 'next/script'
import { alertMessageText, isFormConfigured, myForm } from '../../utils/inquiryConstant'
import { BREAKPOINT_SP, getBreakpointFlags } from '../../utils/commonConstant'
import { isValidEmail, isValidPhone } from '../../utils/emailValidation'
import InquiryTitle from '../Common/Title'

// next.config.js で渡す RECAPTCHA_V2_SITE_KEY と、.env の NEXT_PUBLIC_ の両方を見る（どちらか一方だけの環境でも動く）
const recaptchaSiteKey =
  (
    (typeof process.env.RECAPTCHA_V2_SITE_KEY === 'string' && process.env.RECAPTCHA_V2_SITE_KEY.trim()) ||
    (typeof process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY === 'string' &&
      process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY.trim()) ||
    ''
  ).trim()
const isRecaptchaConfigured = recaptchaSiteKey.length > 0

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props {
  width: number
}

/**
 * InquiryBody component
 * Displays contact form with validation and submission handling
 */
const InquiryBody: React.FC<Props> = ({ width }) => {
  const [familyName, setFamilyName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sentMessage, setSentMessage] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [recaptchaPassed, setRecaptchaPassed] = useState(false)
  const [touchedFamilyName, setTouchedFamilyName] = useState(false)
  const [touchedFirstName, setTouchedFirstName] = useState(false)
  const [touchedEmail, setTouchedEmail] = useState(false)
  const [touchedPhone, setTouchedPhone] = useState(false)
  const [touchedMessage, setTouchedMessage] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const recaptchaRendered = useRef(false)
  /** true のとき iframe load で送信完了扱いにする（ネイティブ submit 直後の load のみ反応） */
  const expectingFormSubmitLoad = useRef(false)
  const { isPC } = getBreakpointFlags(width)

  useLayoutEffect(() => {
    if (!isRecaptchaConfigured) return
    window.onRecaptchaLoad = () => {
      if (recaptchaRendered.current || !window.grecaptcha || !recaptchaSiteKey) return
      const container = document.getElementById('inquiry-recaptcha')
      if (!container || container.children.length > 0) return
      try {
        window.grecaptcha.render(container, {
          sitekey: recaptchaSiteKey,
          callback: () => setRecaptchaPassed(true),
        })
        recaptchaRendered.current = true
      } catch {
        // already rendered or container invalid
      }
    }
    return () => {
      delete window.onRecaptchaLoad
    }
  }, [isRecaptchaConfigured, recaptchaSiteKey])

  // Re-render reCAPTCHA when layout changes (e.g. resize/rotation changes isPC) so the widget appears in the new container
  useLayoutEffect(() => {
    if (!isRecaptchaConfigured || !recaptchaSiteKey) return
    recaptchaRendered.current = false
    const container = document.getElementById('inquiry-recaptcha')
    if (
      container &&
      container.children.length === 0 &&
      typeof window !== 'undefined' &&
      window.grecaptcha
    ) {
      try {
        window.grecaptcha.render(container, {
          sitekey: recaptchaSiteKey,
          callback: () => setRecaptchaPassed(true),
        })
        recaptchaRendered.current = true
      } catch {
        // ignore
      }
    }
  }, [isPC, isRecaptchaConfigured, recaptchaSiteKey])

  const handleRecaptchaScriptLoad = useCallback(() => {
    if (typeof window !== 'undefined' && window.onRecaptchaLoad) window.onRecaptchaLoad()
  }, [])

  const showError = (touched: boolean, invalid: boolean) => (touched || submitAttempted) && invalid

  const handleFamilyNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFamilyName(e.target.value)
  }
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFirstName(e.target.value)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPhone(e.target.value)
  }
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }
  const handleFamilyNameBlur = () => setTouchedFamilyName(true)
  const handleFirstNameBlur = () => setTouchedFirstName(true)
  const handleEmailBlur = () => setTouchedEmail(true)
  const handlePhoneBlur = () => setTouchedPhone(true)
  const handleMessageBlur = () => setTouchedMessage(true)

  const canSubmit = useMemo(
    () =>
      familyName !== '' &&
      firstName !== '' &&
      email !== '' &&
      isValidEmail(email) &&
      phone !== '' &&
      isValidPhone(phone) &&
      message !== '',
    [familyName, firstName, email, phone, message]
  )

  const submitAllowed = canSubmit && (!isRecaptchaConfigured || recaptchaPassed)

  const anyTouched =
    touchedFamilyName ||
    touchedFirstName ||
    touchedEmail ||
    touchedPhone ||
    touchedMessage

  const alertMessage = useMemo(() => {
    if (sentMessage) return alertMessageText.thanksInquiry
    if (!submitAttempted && !anyTouched) return '' // no errors until user interacts or tries submit
    if (isRecaptchaConfigured && canSubmit && !recaptchaPassed)
      return alertMessageText.completeRecaptcha
    if (familyName === '' || firstName === '') return alertMessageText.noName
    if (email === '') return alertMessageText.noEmail
    if (!isValidEmail(email)) return alertMessageText.invalidEmail
    if (phone === '') return alertMessageText.noPhone
    if (!isValidPhone(phone)) return alertMessageText.invalidPhone
    if (message === '') return alertMessageText.noMessage
    return alertMessageText.sendPlease
  }, [
    familyName,
    firstName,
    email,
    phone,
    message,
    sentMessage,
    canSubmit,
    recaptchaPassed,
    submitAttempted,
    anyTouched,
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitAttempted(true)
    if (!submitAllowed || !isFormConfigured) {
      e.preventDefault()
      return
    }
    // ネイティブ送信を許可（ブラウザがフォームをそのまま POST し、iframe に結果が載る）
    expectingFormSubmitLoad.current = true
    // preventDefault しない → フォームがそのまま送信される
  }

  const handleIframeLoad = useCallback(() => {
    if (!expectingFormSubmitLoad.current) return
    expectingFormSubmitLoad.current = false
    setSnackbarOpen(true)
    setFamilyName('')
    setFirstName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setSentMessage(true)
  }, [])

  // Styles
  const inquiryStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '60px 0px 0px',
    margin: '0 auto',
    maxWidth: BREAKPOINT_SP,
  }
  const nameStyle: CSSProperties = {
    display: 'inline-flex',
    gap: 30,
    width: '100%',
  }
  const textFieldStyle: CSSProperties = {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
  }
  const iconStyle: CSSProperties = {
    margin: '-4px 6px 0px 0px',
    padding: 6,
    verticalAlign: 'bottom',
  }
  const buttonStyle: CSSProperties = {
    width: isPC && isRecaptchaConfigured ? 'auto' : '100%',
    minWidth: isPC && isRecaptchaConfigured ? 200 : undefined,
    ...(isPC && isRecaptchaConfigured && { flex: 1 }),
    marginTop: 10,
    paddingLeft: isPC && isRecaptchaConfigured ? 32 : undefined,
    paddingRight: isPC && isRecaptchaConfigured ? 32 : undefined,
    borderRadius: 30,
    background: submitAllowed
      ? 'linear-gradient(to right bottom, var(--blue), var(--darkblue))'
      : 'linear-gradient(to right bottom, var(--gray), var(--transpgray))',
  }
  const buttonTextStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    color: 'white',
    fontSize: 18,
  }
  const alertStyle: CSSProperties = {
    paddingTop: 10,
    fontSize: 16,
  }
  const successMessageStyle: CSSProperties = {
    margin: 15,
    padding: 24,
    textAlign: 'center',
    fontSize: 16,
  }
  const homeButtonStyle: CSSProperties = {
    display: 'inline-block',
    marginTop: 20,
    padding: '12px 24px',
    backgroundColor: 'var(--blue, #3366ff)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
  }

  if (!isFormConfigured) {
    return (
      <div id="inquiry" style={inquiryStyle}>
        <InquiryTitle width={width} title={['お問い合わせフォーム', 'Richiesta']} index={0} />
        <p style={{ ...alertStyle, margin: 15 }}>{alertMessageText.formNotConfigured}</p>
      </div>
    )
  }

  if (sentMessage) {
    return (
      <div id="inquiry" style={inquiryStyle}>
        <InquiryTitle width={width} title={['お問い合わせフォーム', 'Richiesta']} index={0} />
        <div style={successMessageStyle}>
          <p>{alertMessageText.thanksInquiry}</p>
          <p style={{ marginTop: 8, fontSize: 14, color: '#666' }}>
            メールをご確認ください。担当者より改めてご連絡いたします。
          </p>
          <Link href="/" style={homeButtonStyle}>
            ホームへ戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div id="inquiry" style={inquiryStyle}>
      <InquiryTitle width={width} title={['お問い合わせフォーム', 'Richiesta']} index={0} />
      <form
        action={myForm.url}
        method="POST"
        encType="application/x-www-form-urlencoded"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        style={{ margin: 15 }}
      >
        <div style={nameStyle}>
          <TextField
            style={textFieldStyle}
            type="text"
            required
            name={myForm.familyName.number}
            placeholder={myForm.familyName.placeholder}
            label={
              <>
                <AccountIcon fontSize="small" style={iconStyle} />
                {myForm.familyName.label}
              </>
            }
            value={familyName}
            onChange={handleFamilyNameChange}
            onBlur={handleFamilyNameBlur}
            error={showError(touchedFamilyName, familyName === '')}
            helperText={
              showError(touchedFamilyName, familyName === '') ? alertMessageText.noName : ''
            }
            aria-describedby={
              showError(touchedFamilyName, familyName === '') ? 'familyName-helper' : undefined
            }
            slotProps={{
              htmlInput: {
                'aria-invalid': showError(touchedFamilyName, familyName === ''),
              },
            }}
          />
          <TextField
            style={textFieldStyle}
            type="text"
            required
            placeholder={myForm.firstName.placeholder}
            name={myForm.firstName.number}
            label={
              <>
                <AccountIcon fontSize="small" style={iconStyle} />
                {myForm.firstName.label}
              </>
            }
            value={firstName}
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameBlur}
            error={showError(touchedFirstName, firstName === '')}
            helperText={
              showError(touchedFirstName, firstName === '') ? alertMessageText.noName : ''
            }
            aria-describedby={
              showError(touchedFirstName, firstName === '') ? 'firstName-helper' : undefined
            }
            slotProps={{
              htmlInput: {
                'aria-invalid': showError(touchedFirstName, firstName === ''),
              },
            }}
          />
        </div>
        <TextField
          style={textFieldStyle}
          type="text"
          required
          name={myForm.email.number}
          placeholder={myForm.email.placeholder}
          label={
            <>
              <MailIcon fontSize="small" style={iconStyle} />
              {myForm.email.label}
            </>
          }
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={showError(touchedEmail, email === '' || !isValidEmail(email))}
          helperText={
            showError(touchedEmail, email === '')
              ? alertMessageText.noEmail
              : showError(touchedEmail, !isValidEmail(email))
                ? alertMessageText.invalidEmail
                : ''
          }
          aria-describedby={
            showError(touchedEmail, email === '' || !isValidEmail(email)) ? 'email-helper' : undefined
          }
          slotProps={{
            htmlInput: {
              'aria-invalid': showError(touchedEmail, email === '' || !isValidEmail(email)),
            },
          }}
        />
        <TextField
          style={textFieldStyle}
          type="text"
          required
          name={myForm.phone.number}
          placeholder={myForm.phone.placeholder}
          label={
            <>
              <PhoneIcon fontSize="small" style={iconStyle} />
              {myForm.phone.label}
            </>
          }
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          error={showError(touchedPhone, phone === '' || !isValidPhone(phone))}
          helperText={
            showError(touchedPhone, phone === '')
              ? alertMessageText.noPhone
              : showError(touchedPhone, !isValidPhone(phone))
                ? alertMessageText.invalidPhone
                : ''
          }
          aria-describedby={
            showError(touchedPhone, phone === '' || !isValidPhone(phone)) ? 'phone-helper' : undefined
          }
          slotProps={{
            htmlInput: {
              'aria-invalid': showError(touchedPhone, phone === '' || !isValidPhone(phone)),
            },
          }}
        />
        <TextField
          style={textFieldStyle}
          type="text"
          required
          multiline
          rows={10}
          name={myForm.message.number}
          placeholder={myForm.message.placeholder}
          label={
            <>
              <Edit fontSize="small" style={iconStyle} />
              {myForm.message.label}
            </>
          }
          value={message}
          onChange={handleMessageChange}
          onBlur={handleMessageBlur}
          error={showError(touchedMessage, message === '')}
          helperText={
            showError(touchedMessage, message === '') ? alertMessageText.noMessage : ''
          }
          aria-describedby={
            showError(touchedMessage, message === '') ? 'message-helper' : undefined
          }
          slotProps={{
            htmlInput: { 'aria-invalid': showError(touchedMessage, message === '') },
          }}
        />
        {isPC && isRecaptchaConfigured ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'nowrap',
              marginTop: 10,
              marginBottom: 8,
              width: '100%',
            }}
          >
            <Button type="submit" style={buttonStyle} disabled={!submitAllowed}>
              <p style={buttonTextStyle}>送信</p>
            </Button>
            <div style={{ minHeight: 78, display: 'flex', alignItems: 'center' }}>
              <div
                id="inquiry-recaptcha"
                role="presentation"
                aria-label="reCAPTCHA"
              />
            </div>
            <Script
              src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
              strategy="afterInteractive"
              onLoad={handleRecaptchaScriptLoad}
            />
          </div>
        ) : (
          <>
            {isRecaptchaConfigured && (
              <>
                <div
                  style={{
                    marginBottom: 8,
                    minHeight: 78,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    id="inquiry-recaptcha"
                    role="presentation"
                    aria-label="reCAPTCHA"
                  />
                </div>
                <Script
                  src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
                  strategy="afterInteractive"
                  onLoad={handleRecaptchaScriptLoad}
                />
              </>
            )}
            <Button type="submit" style={buttonStyle} disabled={!submitAllowed}>
              <p style={buttonTextStyle}>送信</p>
            </Button>
          </>
        )}
        <div style={{ ...alertStyle, minHeight: 40 }}>
          <p id="form-alert" style={{ margin: 0 }} role="status" aria-live="polite">
            {alertMessage || '\u00A0'}
          </p>
        </div>
      </form>
      <iframe
        name="hidden_iframe"
        style={{ display: 'none' }}
        onLoad={handleIframeLoad}
        title="form target"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={alertMessageText.confirmEmail}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  )
}

export default InquiryBody

// SendGrid (currently disabled: call is commented out)
//
// Purpose: Example of calling /api/sendgrid for auto-reply in addition to Google Forms submission.
// Note: This app uses static export in production, so /api/* routes do not run in production.
//
// const sendInquiryBySendGrid = async () => {
//   const payload = {
//     name: `${familyName} ${firstName}`,
//     email,
//     message,
//   }
//   await fetch('/api/sendgrid', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   })
// }
//
// Usage: Make handleSubmit async and call before e.target.submit():
//   await sendInquiryBySendGrid()
