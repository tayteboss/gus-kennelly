import { useEffect } from 'react';
import { SiteSettingsType } from '../shared/types/types';

const useBgColourUpdate = (productionIsActive: boolean, siteSettings: SiteSettingsType) => {
	useEffect(() => {
		const pageWrapper = document.querySelector('.page-wrapper__inner') as HTMLElement | null;
		const colourElements = document.querySelectorAll('.colour-change') as NodeListOf<HTMLElement>;

		if (!pageWrapper) return;

		const hasProdColour = siteSettings?.productionColour?.hex;
		const hasPhotoColour = siteSettings?.photographyColour?.hex;
		const prodBgColour = hasProdColour ? siteSettings.productionColour.hex : '#FFF';
		const photoBgColour = hasPhotoColour ? siteSettings.photographyColour.hex : '#FFF';

		if (productionIsActive) {
			pageWrapper.style.backgroundColor = prodBgColour;
		} else {
			pageWrapper.style.backgroundColor = photoBgColour;
		}

		if (colourElements.length <= 0) return;

		colourElements.forEach((element) => {
			if (productionIsActive) {
				element.style.backgroundColor = prodBgColour;
				element.style.color = prodBgColour;
			} else {
				element.style.backgroundColor = photoBgColour;
				element.style.color = photoBgColour;
			}
			});
	}, [productionIsActive, siteSettings]);
};

export default useBgColourUpdate;