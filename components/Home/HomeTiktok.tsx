/**
 * HomeTiktok.tsx
 *
 * Home page TikTok section component.
 * Currently disabled: usage in HomeInfo is commented out (same pattern as SendGrid).
 * To enable: uncomment the <HomeTiktok width={width}/> line in HomeInfo.tsx.
 *
 * Features:
 * - TikTok profile / embed area
 * - SNS link integration
 * - Styling consistent with HomeTwitter / HomeInstagram
 */

import { NextPage } from 'next'
import { CSSProperties, useEffect, useState } from 'react'
import HomeSNSLink from './HomeSNSTitle'
import { mySNS } from '../../utils/HomeConstant'
import BlueBorder from '../Common/BlueBorder'

interface Props {
  width: number
}

const TIKTOK_SNS_INDEX = 4

const HomeTiktok: NextPage<Props> = ({ width }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (scriptLoaded) return
    const s = document.createElement('script')
    s.src = 'https://www.tiktok.com/embed.js'
    s.async = true
    s.onload = () => setScriptLoaded(true)
    document.body.appendChild(s)
    return () => {
      if (s.parentNode) s.parentNode.removeChild(s)
    }
  }, [scriptLoaded])

  const tiktokStyle: CSSProperties = {
    width: '100%',
    margin: '0 auto',
    padding: '30px 0 40px',
    color: 'var(--black)',
    textShadow: '1px 2px 3px var(--white)',
    position: 'relative',
    background: 'linear-gradient(to right bottom, var(--yellow), var(--orange))',
  }

  return (
    <div>
      <div style={tiktokStyle}>
        <HomeSNSLink sns={mySNS[TIKTOK_SNS_INDEX]} isDark={true} />
        <div className="tiktok-embed" style={{ maxWidth: 325, margin: '0 auto' }}>
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@soleemare_dolce"
            data-video-id=""
            data-embed-from="embed_page"
            style={{ margin: 0 }}
          >
            <section>
              <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@soleemare_dolce">
                @soleemare_dolce
              </a>
            </section>
          </blockquote>
        </div>
      </div>
      <BlueBorder />
    </div>
  )
}

export default HomeTiktok
