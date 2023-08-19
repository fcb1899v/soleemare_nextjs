import { NextPage } from 'next'
import React, { CSSProperties, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import AccountIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import Edit from '@mui/icons-material/Edit';
import { alertMessageText, myForm } from '../../utils/InquiryConstant';
import InquiryTitle from '../Common/Title';

interface Props  {
  width: number
}

const InquaryBody: NextPage<Props> = ({width}) => { 

  const isSP = (width < 600)
  const isPC = (width > 1024)

  const [familyName, setFamilyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isButtonOn, setButtonStyle] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

  const handleFamilyNameChange = (e: any) => { setFamilyName(e.target.value); };
  const handleFirstNameChange = (e: any) => { setFirstName(e.target.value); };
  const handleEmailChange = (e: any) => { setEmail(e.target.value); };
  const handlePhoneChange = (e: any) => { setPhone(e.target.value); };
  const handleMessageChange = (e: any) => { setMessage(e.target.value); };

  useEffect(() => {
    setButtonStyle(
      (
        familyName != "" && firstName != "" && 
        email != "" && email.match(/.+@.+\..+/) && 
        phone != "" && phone.match(/^0\d{9,10}$/) && 
        message != ""
      ) ? true: false
    );
    setAlertMessage(
      (isButtonOn) ? alertMessageText.sendPlease:
      (sentMessage) ? alertMessageText.thanksInquiry:
      (familyName === "" || firstName === "") ? alertMessageText.noName:
      (email === "") ? alertMessageText.noEmail:
      (!email.match(/.+@.+\..+/)) ? alertMessageText.invalidEmail:
      (phone === "") ? alertMessageText.noPhone:
      (!phone.match(/^0\d{9,10}$/)) ? alertMessageText.invalidPhone:
      alertMessageText.noMessage
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
  }, [familyName, firstName, email, phone, message, sentMessage, isButtonOn, submitted]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isButtonOn) {
      setSubmitted(true);
      alert(alertMessageText.confirmEmail);
      e.target.submit();
    } 
  };

  const handleIframeLoad = (e: any) => {};

  const inquiryStyle: CSSProperties = {
    display: "flex", 
    flexDirection: "column",
    padding: "60px 0px 0px",
    margin: "0 auto",
    maxWidth: 600,
  }
  const nameStyle: CSSProperties = {
    display: "inline-flex", 
    gap: 30, 
    width: "100%",
  }
  const textFieldStyle: CSSProperties = {
    width: "100%", 
    marginBottom: 20,
    backgroundColor: "white", 
  }
  const iconStyle: CSSProperties = {
    margin: "-4px 6px 0px 0px",
    padding: 6,
    verticalAlign: "bottom",
  }
  const buttonStyle: CSSProperties = {
    width: "100%",
    marginTop: 15,
    borderRadius: 30, 
    background: isButtonOn ? "linear-gradient(to right bottom, var(--blue), var(--darkblue))":
                             "linear-gradient(to right bottom, var(--gray), var(--transpgray))",
  }
  const buttonTextStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    color: "white",
    fontSize: 18,
  }
  const alertStyle: CSSProperties = {
    paddingTop: 10,
    fontSize: 16,
  }

  return (
    <div id="inquary" style={inquiryStyle}>
      <InquiryTitle width={width} title={["お問い合わせフォーム", "Richiesta"]} index={0}/>
      <form action={myForm.url} method="POST" target="hidden_iframe" onSubmit={handleSubmit} style={{margin: 15}}>
        <div style={nameStyle}>
          <TextField style={textFieldStyle} type="text" required
            name={myForm.familyName.number} placeholder={myForm.familyName.placeholder}
            label={<><AccountIcon fontSize="small" style={iconStyle}/>{myForm.familyName.label}</>} 
            value={familyName} onChange={handleFamilyNameChange}
          />
          <TextField style={textFieldStyle} type="text" required 
            placeholder={myForm.firstName.placeholder} name={myForm.firstName.number} 
            label={<><AccountIcon fontSize="small" style={iconStyle}/>{myForm.firstName.label}</>} 
            value={firstName} onChange={handleFirstNameChange}
          />
        </div>
        <TextField style={textFieldStyle} type="text" required 
          name={myForm.email.number} placeholder={myForm.email.placeholder}
          label={<><MailIcon fontSize="small" style={iconStyle}/>{myForm.email.label}</>} 
          value={email} onChange={handleEmailChange}
        />
        <TextField style={textFieldStyle} type="text" required 
          name={myForm.phone.number} placeholder={myForm.phone.placeholder}
          label={<><PhoneIcon fontSize="small" style={iconStyle}/>{myForm.phone.label}</>} 
          value={phone} onChange={handlePhoneChange}
        />
        <TextField style={textFieldStyle} type="text" required multiline rows={10}
          name={myForm.message.number} placeholder={myForm.message.placeholder}
          label={<><Edit fontSize="small" style={iconStyle}/>{myForm.message.label}</>} 
          value={message} onChange={handleMessageChange}
        />
        <Button type="submit" style={buttonStyle}>
          <p style={buttonTextStyle}>送信</p>
        </Button>
        {<p style={alertStyle}>{alertMessage}</p>}
      </form>
      <iframe name="hidden_iframe" style={{display:"none"}} onLoad={handleIframeLoad}></iframe>
    </div>
  );
};

export default InquaryBody
  
  // SendGrid
  //
  // useEffect(() => {
  //   setSubmitted(
  //     (familyName != "" && firstName != "" && email != "" && email.match(/.+@.+\..+/) && email != confirmEmail && phone.match(/^0\d{9,10}$/) && message != "") ? true: false
  //   );
  //   setAlertMessage(
  //     (familyName == "" || firstName == "") ? NO_NAME: (email == "") ? NO_EMAIL: (email != confirmEmail) ? WRONG_EMAIL: (message == "") ? NO_MESSAGE: SEND_ERROR
  //   );
  //   setData(JSON.stringify({
  //     familyname: familyName,
  //     firstname: firstName,
  //     email: email,
  //     confirmmail: confirmEmail,
  //     phone: phone,
  //     message: message,
  //   }));
  // }, [familyName, firstName, email, confirmEmail, phone, message]);
  //
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
