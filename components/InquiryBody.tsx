import { NextPage } from 'next'
import styles from '../styles/Inquiry.module.css'
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

const NO_NAME: string = 'お名前を入力してください。'
const NO_EMAIL: string = 'メールアドレスを入力してください。'
const WRONG_EMAIL: string = 'メールアドレスをご確認ください。'
const NO_MESSAGE: string = 'お問い合わせ内容を入力してください。'
const SEND_ERROR: string = '送信エラー'
const THANKS_INQUIRY: string = 'お問い合わせありがとうございました。'
// const THANKS_INQUIRY: string = '送信エラー：info@sole-e-mare.comに直接メールをお願いします。'

const InquaryBody: NextPage = () => { 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(JSON.stringify({}));

  useEffect(() => {
    setData(JSON.stringify({
      name: name,
      email: email,
      message: message,
    }));
  }, [name, email, message]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name != "" && email != "" && email.match(/.+@.+\..+/) && message != "") {
      await fetch("/api/sendgrid", {      
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST"
      }).then(function () {
        alert(THANKS_INQUIRY);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(function (error) {
        console.log(`${SEND_ERROR}: ${error}`);
      });
    } else {
      alert((name == "") ? NO_NAME: (email == "") ? NO_EMAIL: (message == "") ? NO_MESSAGE: WRONG_EMAIL);
    }
  }  

  return (
    <div id="inquary" className={styles.container}>
      <h2>お問い合わせ</h2>
      <form onSubmit={handleSubmit}>
        <TextField required className={styles.text_field} name="name" label="お名前" value={name} type="text" onChange={(e) => setName(e.target.value)}/>
        <TextField required className={styles.text_field} name="email" label="メールアドレス" type="mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <TextField required className={styles.text_field} name="content" label="お問い合わせ内容" value={message} multiline rows="10" variant="outlined" onChange={(e) => setMessage(e.target.value)}/>
        <Button className={styles.send_button} variant="contained" type="submit">送信する</Button>
      </form>
    </div>
  );
};

export default InquaryBody
  
  
