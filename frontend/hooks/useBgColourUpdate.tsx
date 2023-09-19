import { useEffect } from 'react';
import { SiteSettingsType } from '../shared/types/types';

const useBgColourUpdate = (productionIsActive: boolean, siteSettings: SiteSettingsType) => {
	useEffect(() => {
		const body = document.querySelector('body') as HTMLElement | null;
		const colourElements = document.querySelectorAll('.colour-change') as NodeListOf<HTMLElement>;

		if (!body) return;

		const hasProdColour = siteSettings?.productionColour?.hex;
		const hasPhotoColour = siteSettings?.photographyColour?.hex;
		const prodBgColour = hasProdColour ? siteSettings.productionColour.hex : '#FFF';
		const photoBgColour = hasPhotoColour ? siteSettings.photographyColour.hex : '#FFF';

		if (productionIsActive) {
			body.style.backgroundColor = prodBgColour;
		} else {
			body.style.backgroundColor = photoBgColour;
		}

		if (colourElements.length <= 0) return;

		colourElements.forEach((element) => {
			if (productionIsActive) {
				element.style.backgroundColor = prodBgColour;
			} else {
				element.style.backgroundColor = photoBgColour;
			}
			});
	}, [productionIsActive, siteSettings]);
};

export default useBgColourUpdate;