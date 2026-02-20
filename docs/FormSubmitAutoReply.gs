/**
 * Google Form 送信時トリガー: 自動返信メール送信
 *
 * 設定手順:
 * 1. フォームと連携したスプレッドシートを開く
 * 2. 拡張機能 > Apps Script でこのコードを貼り、保存
 * 3. トリガーを追加: イベントのソース「フォームから」、イベント「フォーム送信時」
 * 4. 初回は「実行」から onFormSubmit を選び、承認して送信テスト
 *
 * 重要: フォームの「質問タイトル」と下記の namedValues のキーを完全に一致させること。
 * スプレッドシートの1行目（ヘッダー）が実際のキー名です。
 */
function onFormSubmit(e) {
  if (!e || !e.namedValues) return;

  // フォームの質問タイトルと完全一致させる（ウェブ側は お電話番号 / お問い合わせ内容）
  var timestamp = (e.namedValues['タイムスタンプ'] && e.namedValues['タイムスタンプ'][0]) || '';
  var familyName = (e.namedValues['姓'] && e.namedValues['姓'][0]) || '';
  var firstName = (e.namedValues['名'] && e.namedValues['名'][0]) || '';
  var name = (familyName + ' ' + firstName).trim();
  var email = (e.namedValues['メールアドレス'] && e.namedValues['メールアドレス'][0]) || '';
  var phone = (e.namedValues['お電話番号'] && e.namedValues['お電話番号'][0]) || '';  // 「電話番号」ではなく「お電話番号」
  var inquirydetail = (e.namedValues['お問い合わせ内容'] && e.namedValues['お問い合わせ内容'][0]) || '';  // 「お問い合わせ内容詳細」ではなく「お問い合わせ内容」

  if (!email) return; // メールアドレスがなければ送信しない

  var subject = '【自動返信】' + name + ' 様 お問合せありがとうございます';
  var body =
    name + ' 様' + '\n' +
    '\n' +
    'この度は、ソレ・エ・マーレにお問い合わせいただき、誠にありがとうございます。' + '\n' +
    'このメールは自動返信でございます。' + '\n' +
    '\n' +
    '〜お問合せ内容〜' + '\n' +
    'お名前：' + name + ' 様' + '\n' +
    'メールアドレス：' + email + '\n' +
    '電話番号：' + phone + '\n' +
    'お問い合わせ内容：' + inquirydetail + '\n' +
    'フォーム送信日時：' + timestamp + '\n' +
    '\n' +
    'お問い合わせいただいた内容につきましては、担当者より改めてご連絡を差し上げますので、今しばらくお待ちください。' + '\n' +
    'お問い合わせいただいた内容によっては、回答までにお時間をいただく場合がございます。予めご了承ください。' + '\n' +
    '\n' +
    '今後とも、ソレ・エ・マーレをご利用いただけますよう、何卒よろしくお願いいたします。' + '\n' +
    '\n' +
    'ソレ・エ・マーレ' + '\n' +
    'カスタマーサポート' + '\n';

  var options = {
    name: 'ソレ・エ・マーレ〜太陽と海〜 Sole e Mare',
    replyTo: 'info@sole-e-mare.com',
    bcc: 'info@sole-e-mare.com'
  };
  // from は Gmail では無視されることが多いため省略（スクリプト実行アカウントから送信されます）
  GmailApp.sendEmail(email, subject, body, options);
}
