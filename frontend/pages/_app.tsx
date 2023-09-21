import { useState } from 'react';
import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import use1vh from '../hooks/use1vh';
import { Transitions } from '../shared/types/types';
import useHeaderHeight from '../hooks/useHeaderHeight';

const pageTransitionVariants: Transitions = {
	hidden: { opacity: 0, transition: { duration: 0.5 } },
	visible: { opacity: 1, transition: { duration: 0.5, delay: 0.25 } },
};

type Props = {
	Component: any; // TO BE UPDATED
	pageProps: {};
};

const App = (props: Props) => {
	const {
		Component,
		pageProps
	} = props;

	const router= useRouter();
	const routerEvents = router.events;

	const handleExitComplete = (): void => {
		window.scrollTo(0, 0);
	};

	use1vh();
	useHeaderHeight();

	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<Layout>
					<AnimatePresence
						mode="wait"
						onExitComplete={() => handleExitComplete()}
					>
						<Component
							{...pageProps}
							key={router.asPath}
							pageTransitionVariants={pageTransitionVariants}
						/>
					</AnimatePresence>
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default App;
