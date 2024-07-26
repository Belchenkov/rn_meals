import { View, Text } from "react-native";

const MealDetailScreen = ({ route }) => {
	const mealId = route.params.mealId;

	return (
		<View>
			<Text>This is the meal screen (MEAL {mealId})</Text>
		</View>
	);
};

export default MealDetailScreen;
