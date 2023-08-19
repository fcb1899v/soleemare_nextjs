import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_APIKEY || "");

/**
 * @param {{ body: { name: string; email: string; message: string; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string; }): any; new (): any; }; }; }} res
 */
async function sendEmail(req, res) {
  try {
    await sgMail.send({
      to: [`${req.body.email}`, "info@sole-e-mare.com",],
      from: "info@sole-e-mare.com",
      subject: "【自動返信】お問い合わせありがとうございます",
      text: `
        ${req.body.name} 様\n

        このたびは、ソレ・エ・マーレにお問い合わせいただき、誠にありがとうございます。\n
        このメールは自動返信となります。\n\n\

        [メールアドレス]\n
        ${req.body.email}\n\n

        [お問い合わせ内容]\n
        ${req.body.message}\n\n
        
        お問い合わせいただいた内容につきまして、ご担当者が確認次第、改めてご連絡差し上げます。\n
        なお、お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。\n
        何卒ご了承くださいますよう、よろしくお願いいたします。\n
        何かご不明な点がございましたら、お気軽にお問い合わせください。\n\n
        
        今後とも、よろしくお願い申し上げます。\n
        
        敬具\n
        ソレ・エ・マーレ
      `,
      html: `
        <div style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1;">
          <p>${req.body.name} 様</p>
          <br/>
          <p>このたびは、ソレ・エ・マーレにお問い合わせいただき、誠にありがとうございます。</p>
          <p>このメールは自動返信となります。</p>
          <br/>
          <p>[メールアドレス]</p>
          <p>${req.body.email}</p>
          <br/>
          <p>[お問い合わせ内容]</p>
          <p>${req.body.message}</p>
          <br/>
          <p>お問い合わせいただいた内容につきまして、ご担当者が確認次第、改めてご連絡差し上げます。</p>
          <p>なお、お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。</p>
          <p>何卒ご了承くださいますよう、よろしくお願いいたします。</p>
          <p>何かご不明な点がございましたら、お気軽にお問い合わせください。</p>
          <br/>
          <p>今後とも、よろしくお願い申し上げます。</p>
          <br/>
          <p>敬具</p>
          <p>ソレ・エ・マーレ</p>
        </div>
      `,
    });
  } catch (error) {
  }
  return res.status(200).json({ error: "" });
}

export default sendEmail;



