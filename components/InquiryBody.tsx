import { NextPage } from 'next'
import styles from '../styles/Inquiry.module.css'
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

const NO_NAME: string = 'お名前を入力してください'
const NO_EMAIL: string = 'メールアドレスを入力してください'
const NO_PHONE: string = '電話番号を入力してください'
const NO_MESSAGE: string = 'お問い合わせ内容を入力してください'
const INVALID_EMAIL: string = 'メールアドレスをご確認ください'
const INVALID_PHONE: string = '電話番号をご確認ください'
const SEND_PLEASE: string = '送信ボタンを押してください'
const THANKS_INQUIRY: string = 'お問い合わせありがとうございました'
const CONFIRM_EMAIL: string = 'メールをご確認ください。\n確認メールが届かない場合はもう一度お問い合わせください。'
// const SEND_ERROR: string = '送信エラー'

const InquaryBody: NextPage = () => { 

  const [familyName, setFamilyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [buttonStyle, setButtonStyle] = useState(styles.send_button_off);
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

  const formUrl = `https://docs.google.com/forms/u/0/d/e/${process.env.NEXT_PUBLIC_GOOGLE_FORM}/formResponse`;
  const formLabel = ["姓", "名", "メールアドレス", "電話番号", "お問い合わせ内容"]
  const formPlaceholder = ['青海', '陽葵', 'himari_aomi@sole-e-mare.jp', '09012345678', NO_MESSAGE]
  const formNumber = ["entry.803558779", "entry.1764860706", "entry.1965966452", "entry.1268666368", "entry.282686394"];
  const handleFamilyNameChange = (e: any) => { setFamilyName(e.target.value); };
  const handleFirstNameChange = (e: any) => { setFirstName(e.target.value); };
  const handleEmailChange = (e: any) => { setEmail(e.target.value); };
  const handlePhoneChange = (e: any) => { setPhone(e.target.value); };
  const handleMessageChange = (e: any) => { setMessage(e.target.value); };

  useEffect(() => {
    setAlertMessage(
      (sentMessage) ? THANKS_INQUIRY:
      (familyName === "" || firstName === "") ? NO_NAME:
      (email === "") ? NO_EMAIL:
      (!email.match(/.+@.+\..+/)) ? INVALID_EMAIL:
      (phone === "") ? NO_PHONE:
      (!phone.match(/^0\d{9,10}$/)) ? INVALID_PHONE:
      (message === "") ? NO_MESSAGE:
      SEND_PLEASE
    );
    setButtonStyle(
      (
        familyName != "" && 
        firstName != "" && 
        email != "" && 
        email.match(/.+@.+\..+/) && 
        phone != "" && phone.match(/^0\d{9,10}$/) && 
        message != "" 
      ) ? styles.send_button: styles.send_button_off
    );
    if (submitted) {
      setFamilyName("");
      setFirstName("");
      setEmail("");
      setPhone("");
      setMessage("");  
      setSentMessage(true);
      setTimeout(() => { window.location.href = "/";}, 3000);     
    }
  }, [familyName, firstName, email, phone, message, sentMessage, submitted]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (buttonStyle == styles.send_button) {
      setSubmitted(true);
      alert(CONFIRM_EMAIL);
      e.target.submit();
    } 
  };

  const handleIframeLoad = (e: any) => {};

  return (
    <div id="inquary" className={styles.container}>
      <h2>お問い合わせ</h2>
      <form action={formUrl} method="POST" target="hidden_iframe" onSubmit={handleSubmit}>
        <div className={styles.name_container}>
          <TextField className={styles.text_field} type="text" required
            name={formNumber[0]} label={formLabel[0]} placeholder={formPlaceholder[0]}
            value={familyName} onChange={handleFamilyNameChange}
          />
          <TextField className={styles.text_field} type="text" required
            name={formNumber[1]} label={formLabel[1]} placeholder={formPlaceholder[1]}
            value={firstName} onChange={handleFirstNameChange}
          />
        </div>
        <TextField className={styles.text_field} type="text" required
            name={formNumber[2]} label={formLabel[2]} placeholder={formPlaceholder[2]}
            value={email} onChange={handleEmailChange}
        />
        <TextField className={styles.text_field} type="text" required
            name={formNumber[3]} label={formLabel[3]} placeholder={formPlaceholder[3]}
            value={phone} onChange={handlePhoneChange}
        />
        <TextField className={styles.text_field} type="text" required multiline rows={10}
            name={formNumber[4]} label={formLabel[4]} placeholder={formPlaceholder[4]}
            value={message} onChange={handleMessageChange}
        />
        <Button type="submit" className={buttonStyle}>
          <p>送信</p>
        </Button>
      </form>
      <iframe name="hidden_iframe" style={{display:"none"}} onLoad={handleIframeLoad}></iframe>
      {<h4>{alertMessage}</h4>}
    </div>
  );
};

export default InquaryBody
  
  

  // SendGrid

  // useEffect(() => {
  //   setSubmitted(
  //     (familyName != "" && firstName != "" && email != "" && email.match(/.+@.+\..+/) && email != confirmEmail && phone.match(/^0\d{9,10}$/) && message != "") ? true: false
  //   );

  //   setAlertMessage(
  //     (familyName == "" || firstName == "") ? NO_NAME: (email == "") ? NO_EMAIL: (email != confirmEmail) ? WRONG_EMAIL: (message == "") ? NO_MESSAGE: SEND_ERROR
  //   );

  // 
  //   setData(JSON.stringify({
  //     familyname: familyName,
  //     firstname: firstName,
  //     email: email,
  //     confirmmail: confirmEmail,
  //     phone: phone,
  //     message: message,
  //   }));
  // }, [familyName, firstName, email, confirmEmail, phone, message]);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   if isSubmitted {
  //     await fetch("/api/sendgrid", {      
  //       body: data,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST"
  //     }).then(function () {
  //       alert(THANKS_INQUIRY);
  //       setFamilyName("");
  //       setFirstName("");
  //       setEmail("");
  //       setConfirmEmail("");
  //       setMessage("");
  //     })
  //     .catch(function (error) {
  //       console.log(`${SEND_ERROR}: ${error}`);
  //     });
  //   } else {
  //     alert(alertMessage);
  //   }
  // }  
