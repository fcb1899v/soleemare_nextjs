/**
 * PolicyBody.tsx
 * 
 * Privacy policy and terms of service component
 * 
 * Features:
 * - Displays privacy policy and terms of service
 * - Responsive design for different screen sizes
 * - Structured content with titles and explanations
 * - Contact information for privacy inquiries
 * 
 * Dependencies:
 * - PolicyConstant for privacy policy content
 */

import { NextPage } from 'next'
import { CSSProperties } from 'react';
import { privacyPolicy } from '../../utils/PolicyConstant';

/**
 * Props interface
 * @param width - Screen width for responsive design
 */
interface Props  {
  width: number
}

/**
 * PolicyBody component
 * Displays privacy policy and terms of service with structured layout
 */
const PolicyBody: NextPage<Props> = ({width}) => { 
    
  // Responsive breakpoint detection
  const isSP = (width < 600)
  const isPC = (width > 1024)

  // Style definitions
  const policyStyle: CSSProperties = {
    margin: "80px auto 0 auto",
    padding: isSP ? "0 20px": "0 50px",
    maxWidth: 800,
    fontSize: 16,
  }
  const policyTitleStyle: CSSProperties = {
    fontSize: 24, 
    padding: 5,
  }
  const policyItemStyle: CSSProperties = {
    textAlign: "left", 
    paddingBottom: 5,
  }
  const itemTitleStyle: CSSProperties = {
    fontSize: 20, 
  }
  const explanationStyle: CSSProperties ={
    padding: "5px 0px 5px 28px",
    textIndent: -32
  }
  const conditionStyle: CSSProperties = {
    padding: "5px 0px 5px 36px",
    textIndent: -21,
    listStyleType: "disc",
  }
  const contactStyle: CSSProperties = {
    margin: "20px auto",
    paddingBottom: 30,
    textAlign: "center",
  }
  const contactTitleStyle: CSSProperties = {
    fontSize: 20, 
  }

  return (<div id="privacypolicy" style={policyStyle}>
    {/* Policy title */}
    <h2 style={policyTitleStyle}>利用規約
      <br style={{display: isSP ? undefined: "none"}}/>
      {`${isSP ? "": "・"}プライバシーポリシー`}
    </h2>
    {/* Policy sections */}
    {privacyPolicy.map((policy, i) => 
      <div key={`title_${i}`} style={policyItemStyle}>
        {/* Section title */}
        <h3 style={itemTitleStyle}>{policy.title}</h3>
        {/* Section explanations and conditions */}
        {policy.explanation.map((explanation, j) => 
          <div key={`explanation_${i}_${j}`}>
            <ul style={explanationStyle}>{explanation}</ul>
            {/* Conditions list */}
            {policy.condition[j].map((condition, k) => 
              (condition != "") && <li key={`condition_${i}_${k}`} style={conditionStyle}>{condition}</li>
            )}
            {(policy.condition[j].join("").length > 0) && <br/>}
          </div>
        )}
      </div>
    )}
    {/* Contact information section */}
    <div style={contactStyle}>
      <h3 style={contactTitleStyle}>個人情報管理責任者</h3>
      <p>ソレ・エ・マーレ : 中島 萌</p>
      <div className="flex_center_wrap">
        <p style={{margin: "5px 0"}}>プライバシーポリシーのご不明点は、</p>
        <p style={{margin: "5px 0"}}>下記お問い合わせにてご連絡ください</p>
      </div>
    </div>
  </div>);
}

export default PolicyBody