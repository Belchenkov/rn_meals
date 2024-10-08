import { useContext, useLayoutEffect }               from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

const MealDetailScreen = ({ route, navigation }) => {
	const favoriteMealsCtx = useContext(FavoritesContext);
	const mealId = route.params.mealId;
	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

	const changeFavoriteStatusHandler = () => {
		if (mealIsFavorite) {
			favoriteMealsCtx.removeFavorite(mealId);
		} else {
			favoriteMealsCtx.addFavorite(mealId);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return <IconButton
					icon={mealIsFavorite ? 'star' : 'star-outline'}
					color='white'
					onPress={changeFavoriteStatusHandler}
				/>
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

	return (
		<ScrollView style={styles.rootContainer}>
			<Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
			<Text style={styles.title}>{selectedMeal.title}</Text>
			<View>
				<MealDetails
					duration={selectedMeal.duration}
					complexity={selectedMeal.complexity}
					affordability={selectedMeal.affordability}
					textStyle={styles.detailText}
				/>
			</View>
			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<SubTitle>Ingredients</SubTitle>
					<List data={selectedMeal.ingredients} />

					<SubTitle>Steps</SubTitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
};

export default MealDetailScreen;

const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 32,
	},
	image: {
		width: '100%',
		height: 350,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
		color: 'white'
	},
	detailText: {
		color: 'white',
	},
	subTitle: {
		color: '#e2b497',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	subTitleContainer: {
		padding: 6,
		marginHorizontal: 24,
		marginVertical: 4,
		borderBottomColor: '#e2b497',
		borderBottomWidth: 2,
	},
	listOuterContainer: {
		alignItems: 'center',
	},
	listContainer: {
		width: '80%',
	},
});
