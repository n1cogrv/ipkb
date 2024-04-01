import React from 'react';
import ThemedImage from '@theme/ThemedImage';

import LightSocialCardImage from '@site/static/img/ipkb-social-card-black-white.png';
import DarkSocialCardImage from '@site/static/img/ipkb-social-card-white-black.png';

export default function PosterCover() {
    return (
        <ThemedImage 
        alt='IPKB'
        sources={{
            light: LightSocialCardImage,
            dark: DarkSocialCardImage,
        }}/>
    )
}
