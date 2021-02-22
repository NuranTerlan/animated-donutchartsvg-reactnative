import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import DonutChart from "./DonutChart";

const data = [
	{
		percentage: 8,
		color: "skyblue",
		max: 10,
	},
	{
		percentage: 14,
		color: "tomato",
		max: 20,
	},
	{
		percentage: 92,
		color: "gold",
		max: 100,
	},
	{
		percentage: 240,
		color: "dodgerblue",
		max: 500,
		radius: 100,
		strokeWidth: 25,
	},
];

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			{data.map((chart, i) => {
				return (
					<View style={{ marginVertical: 15 }} key={i}>
						<DonutChart
							percentage={chart.percentage}
							color={chart.color}
							delay={1000}
							max={chart.max}
							radius={chart.radius}
							strokeWidth={chart.strokeWidth}
						/>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
