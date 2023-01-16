export const useDarkControl = () => {
	const use_dark = useDark()

	const is_dark = useState('dark-control', () => false)
	const toggle_dark = useThrottleFn((open?: boolean) => {
		const status = open ?? !is_dark.value
		console.log(status)
		is_dark.value = status
		use_dark.value = status
	}, 500)

	onMounted(() => (is_dark.value = use_dark.value))

	return { is_dark, toggle_dark }
}
