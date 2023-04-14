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
const SEND_ERROR: string = '送信エラー'
const THANKS_INQUIRY: string = 'お問い合わせありがとうございました'


const InquaryBody: NextPage = () => { 

  const [familyName, setFamilyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

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
  }, [familyName, firstName, email, phone, message, sentMessage]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (familyName != "" && firstName != "" && message != "" && email != "" && email.match(/.+@.+\..+/) && phone != "" && phone.match(/^0\d{9,10}$/) && message != "" ) {
      setSubmitted(true);
      e.target.submit();
    } 
  };

  const handleFamilyNameChange = (e: any) => {
    setFamilyName(e.target.value);
  };

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleIframeLoad = (e: any) => {
    if (submitted) {
        setFamilyName("");
        setFirstName("");
        setEmail("");
        setPhone("");
        setMessage("");  
        setSentMessage(true);
        setTimeout(() => { window.location.href = "/";}, 3000);   
    }
  };

  return (
    <div id="inquary" className={styles.container}>
      <h2>お問い合わせ</h2>
      <form 
        action={`https://docs.google.com/forms/u/0/d/e/${process.env.NEXT_PUBLIC_GOOGLE_FORM}/formResponse`}
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit}
      >
        <div className={styles.name_container}>
          <TextField className={styles.text_field} type="text" 
            name="entry.803558779" label="姓" placeholder='青海' 
            value={familyName} onChange={handleFamilyNameChange}
          />
          <TextField className={styles.text_field} type="text" 
            name="entry.1764860706" label="名" placeholder='陽葵'
            value={firstName} onChange={handleFirstNameChange}
          />
        </div>
        <TextField className={styles.text_field} type="text" 
          name="entry.1965966452" label="メールアドレス" placeholder='himari_aomi@sole-e-mare.jp'
          value={email} onChange={handleEmailChange}
        />
        <TextField className={styles.text_field} type="text" 
          name="entry.1268666368" label="電話番号" placeholder='09012345678'
          value={phone} onChange={handlePhoneChange}
        />
        <TextField className={styles.text_field} type="text" multiline rows={10}
          name="entry.282686394" label="お問い合わせ内容" placeholder={NO_MESSAGE}
          value={message} onChange={handleMessageChange}
        />
        <Button type="submit"
          className={
            (familyName != "" && firstName != "" && email != "" && email.match(/.+@.+\..+/) && 
            phone != "" && phone.match(/^0\d{9,10}$/) && message != "" ) ? styles.send_button: styles.send_button_off
          } 
        >
          <p>送信</p>
        </Button>
      </form>
      <iframe
        name="hidden_iframe"
        style={{ display: "none" }}
        onLoad={handleIframeLoad}
      ></iframe>
      { <h4>{alertMessage}</h4> }
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
