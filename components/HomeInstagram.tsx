import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styles from '../styles/HomeInfo.module.css'
import {Card, CardMedia } from "@mui/material";


async function getInstaItems(): Promise<[]> {
  try {
    const userId = process.env.NEXT_PUBLIC_INSTA_ID;
    const token = process.env.NEXT_PUBLIC_INSTA_TOKEN;
    const instaUrl = `https://graph.facebook.com/v15.0/${userId}?fields=media.limit(10){id,caption,media_url,thumbnail_url,timestamp,media_type,permalink,like_count}&access_token=${token}`;
    const response: any = await axios.get<[]>(instaUrl);
    console.log(response.data["media"]["data"])
    return response.data["media"]["data"];
  } catch (error) {
    console.error(error);
    return []
  }
}

export default function HomeInstagram() {
  const [instaItems, setInstaItems] = useState<[] |[]>([]);
  useEffect(() => {
    (async () => {
      const instaItems: [] = await getInstaItems();
      setInstaItems(instaItems);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.border__yellow}>
        <div className={styles.box}>
          <div className={styles.title}>
            <h2>Instagram</h2>
            <a className={styles.snsIcon} href="https://www.instagram.com/soleemare_dolce">
              <img src="../sns/instagram_b.svg" alt="Instagram"/>
            </a>
          </div>
          <div className={styles.insta} >
            <div className={(instaItems.length == 0) ? styles.insta_box_none: styles.insta_box}>
              <div className={(instaItems.length == 0) ? styles.insta_name_none: styles.insta_name}>
                <img src="../images/soleemare_logo.png" alt="Sole e Mare"/>
                <p>@soleemare_dolce</p>
                <div className={styles.insta_logo}>
                  <a href="https://www.instagram.com/soleemare_dolce">
                    <img src="../sns/instagram_logo.png" alt="Instagram"/>
                  </a>
                </div>
              </div>
              {
                instaItems.map((item: any, i: number) => (
                  <a key={i} href={item["permalink"]} className={styles.insta_link}>
                    <Card className={styles.insta_container}>
                      <CardMedia
                        className={styles.insta_image}
                        image={(item["media_type"] == "VIDEO") ? item["thumbnail_url"]: item["media_url"]}
                        title="refrigerator"
                      />
                      <div className={styles.insta_like}>♥ {item["like_count"]}</div>
                      {/* <CardContent>
                        <Typography>
                          {item["caption"]}
                        </Typography>
                      </CardContent> */}
                    </Card>
                  </a>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



