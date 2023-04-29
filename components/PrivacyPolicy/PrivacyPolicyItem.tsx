import { NextPage } from 'next'
import styles from '/styles/PrivacyPolicy.module.css'

interface Props {
  title: string
  explanations: string[]
  isconditions: boolean
  conditions: string[][]
}

const PrivacyPolicyItemConditon: NextPage<Props> = ({ title, explanations, isconditions, conditions }) => { 
  return (
    <div className={styles.policy_item}>
      <h3>{title}</h3>
      {
        (isconditions) ? 
          explanations.map((explanation: string, i: number) => <div key={`explanation_${i}`}>
            <ul>{explanation}</ul>
            {
              conditions[i].map((condition: string, j: number) => <li key={`condition_${j}`}>{condition}</li>)
            }
          </div>)
        : explanations.map((explanation: string, k: number) => <div key={`explanation_${k}`}>
            <ul>{explanation}</ul>
          </div>)
      }
    </div>
  );
};

export default PrivacyPolicyItemConditon
  
  