/**
 * pages/404.tsx
 *
 * Custom 404 Not Found page.
 * Shown when the user navigates to a route that does not exist.
 */

import type { NextPage } from 'next'
import Link from 'next/link'
import Head from '../components/Common/Head'
import Splash from '../components/Common/Splash'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import BlueBorder from '../components/Common/BlueBorder'
import { useWindowSize } from '../hooks/useLayout'

const NotFound: NextPage = () => {
  const width = useWindowSize()[0]
  return (
    <div>
      <Head
        title="ページが見つかりません | ソレ・エ・マーレ〜太陽と海〜 Sole e Mare"
        description="お探しのページは見つかりませんでした。ソレ・エ・マーレのトップページへお戻りください。"
        path="/404/"
      />
      <Splash />
      <Header width={width} isHome={false} />
      <main
        style={{
          marginTop: 80,
          padding: '40px 20px',
          textAlign: 'center',
          minHeight: '40vh',
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>404</h1>
        <p style={{ marginBottom: 24 }}>お探しのページは見つかりませんでした。</p>
        <Link href="/" style={{ color: '#039be5', textDecoration: 'underline' }}>
          トップページへ戻る
        </Link>
      </main>
      <BlueBorder />
      <Footer width={width} />
    </div>
  )
}

export default NotFound
