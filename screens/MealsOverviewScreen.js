import { View, FlatList, StyleSheet }  from "react-native";

import { MEALS } from "../data/dummy-data";
import MealItem  from "../components/MealItem";

const MealsOverviewScreen = ({ route }) => {
	const { categoryId } = route.params;

	const displayedMeals = MEALS.filter(mealItem => mealItem.categoryIds.indexOf(categoryId) >= 0);

	const renderMealItem = itemData => {
		const { title, imageUrl, duration, complexity, affordability } = itemData.item;

		const mealItemProps = {
			title,
			imageUrl,
			duration,
			complexity,
			affordability,
		};

		return (
			<MealItem
				key={itemData.item.id}
				{...mealItemProps}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={displayedMeals}
				keyExtractor={item => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
});
