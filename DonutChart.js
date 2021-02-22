import React, { useEffect, useRef } from "react";
import { Animated, View, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

function DonutChart({
	percentage = 75,
	radius = 40,
	strokeWidth = 10,
	duration = 500,
	color = "dodgerblue",
	delay = 500,
	textColor,
	max = 100,
}) {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const circleRef = useRef();
	const inputRef = useRef();
	const halfCircle = radius + strokeWidth;
	const circleCircumference = 2 * Math.PI * radius;
	const animation = (toValue) => {
		return Animated.timing(animatedValue, {
			toValue,
			duration,
			delay,
			useNativeDriver: true,
		}).start(() => {
			animation(toValue === 0 ? percentage : 0);
		});
	};

	useEffect(() => {
		animation(percentage);

		animatedValue.addListener((v) => {
			if (circleRef?.current) {
				const maxPercentage = (100 * v.value) / max;
				const strokeDashoffset =
					circleCircumference - (circleCircumference * maxPercentage) / 100;
				circleRef.current.setNativeProps({
					strokeDashoffset,
				});
			}

			if (inputRef?.current) {
				inputRef.current.setNativeProps({
					text: Math.round(v.value).toString(),
				});
			}
		});

		return () => {
			animatedValue.removeAllListeners();
		};
	}, [max, percentage]);

	return (
		<View>
			<Svg
				width={radius * 2}
				height={radius * 2}
				viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
			>
				<G rotation="-90" originX={halfCircle} originY={halfCircle}>
					<Circle
						cx="50%"
						cy="50%"
						stroke={color}
						strokeWidth={strokeWidth}
						r={radius}
						fill="transparent"
						strokeOpacity={0.2}
					/>
					<AnimatedCircle
						ref={circleRef}
						cx="50%"
						cy="50%"
						stroke={color}
						strokeWidth={strokeWidth}
						r={radius}
						fill="transparent"
						strokeDasharray={circleCircumference}
						strokeDashoffset={circleCircumference}
						strokeLinecap="round"
					/>
				</G>
			</Svg>
			<AnimatedText
				ref={inputRef}
				underlineColorAndroid="transparent"
				editable={false}
				defaultValue="0"
				style={[
					StyleSheet.absoluteFillObject,
					{
						fontSize: radius / 2,
						color: textColor ?? color,
						fontWeight: "bold",
						textAlign: "center",
					},
				]}
			/>
		</View>
	);
}

export default DonutChart;
