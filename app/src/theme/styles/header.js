import { StyleSheet } from 'react-native';
import colors from '../color';
import fonts from '../font';

const styles = StyleSheet.create({
	lightheader: {
		backgroundColor: colors.background,
		height: 55,
	},
	blurBackground: {
		backgroundColor: 'rgba(0,0,0,0.1)',
	},
	header: {
		backgroundColor: colors.primary,
		height: 55,
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 5,
		height: 40
	},
	lightbackground: {
		backgroundColor: colors.light,
		borderWidth: 2,
		borderColor: colors.background
	},
	darkbackground: {
		backgroundColor: colors.primary
	},
	primaryColor: {
		backgroundColor: colors.primary
	},
	secondaryColor: {
		backgroundColor: colors.background
	},
	icon: {
		fontSize: 28,
		color: colors.light,
		marginTop: 2,
	},
	darkicon: {
		fontSize: 28,
		color: 'rgb(118,118,118)',
		marginTop: 2,
	},
	headtitle: {
		fontSize: 20,
		color: 'rgb(255,255,255)',
		fontFamily: fonts.bold,
		textAlign: 'center'
	},
	left: {
		paddingLeft: 5,
		flex: 0.1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	body: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	inputField: {
		width: '100%',
		height: '100%'
	},
	right: {
		paddingRight: 5,
		flexDirection: 'row',
		flex: 0.5,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	rightText: {
		fontSize: 16,
		color: 'rgb(255,255,255)',
		fontFamily: fonts.regular,
		textAlign: 'center'
	},
	filterContainer: {
		display: 'flex',
		backgroundColor: colors.light,
		borderBottomWidth: 2,
		borderBottomColor: colors.gray,
		flexDirection: 'row',
		alignItems: 'center',
		margin: 0,
	},
	filterTypes: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRightWidth: 1,
		paddingTop: 10,
		paddingBottom: 10,
		borderRightColor: colors.gray
	},
	filterType2: {
		borderRightWidth: 0,
		borderLeftWidth: 1,
		borderLeftColor: colors.gray
	},
	filterIcon: {
		fontSize: 22,
		color: colors.darkgray,
		marginRight: 10
	},
	filterText: {
		marginLeft: 10,
		fontSize: 20,
		color: colors.darkgray
	}

});

export default styles;
