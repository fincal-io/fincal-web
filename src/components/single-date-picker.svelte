<script lang="ts">
	import NextIcon from '../icons/nextIcon.svelte';
	import PreviousIcon from '../icons/previousIcon.svelte';
	import IconButton from './button/iconButton.svelte';

	// Type definitions
	interface DayInfo {
		date: number;
		current: boolean;
		selected: boolean;
	}

	let {
		initialDate = new Date(),
		selectedDate,
		setSelectedDate
	}: {
		initialDate?: Date;
		selectedDate?: Date;
		setSelectedDate?: (date: Date) => void;
	} = $props();

	let currentMonth = $state<Date>(new Date(initialDate?.getFullYear(), initialDate?.getMonth()));

	// Derived values for calendar display
	let daysInMonth = $derived<number>(
		new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
	);

	let firstDayOfMonth = $derived<number>(
		new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
	);

	// Month and year display
	let monthYear = $derived<string>(
		`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`
	);

	// Calendar grid calculation
	let calendarDays = $derived.by(() => {
		console.log('recreated');
		const days: DayInfo[] = [];
		const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
		const prevMonthDays = prevMonth.getDate();

		// Previous month days
		for (let i = firstDayOfMonth - 1; i >= 0; i--) {
			days.push({
				date: prevMonthDays - i,
				current: false,
				selected: false
			});
		}

		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				date: i,
				current: true,
				selected: !!(
					selectedDate &&
					selectedDate.getDate() === i &&
					selectedDate.getMonth() === currentMonth.getMonth() &&
					selectedDate.getFullYear() === currentMonth.getFullYear()
				)
			});
		}

		// Next month days
		const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
		for (let i = 1; i <= remainingDays; i++) {
			days.push({
				date: i,
				current: false,
				selected: false
			});
		}

		return days;
	});

	// Navigation functions
	function previousMonth(): void {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
	}

	function nextMonth(): void {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
	}

	// Weekday labels
	const weekDays: readonly string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
</script>

<div class="calendar">
	<div class="header">
		<IconButton onclick={previousMonth}>
			<PreviousIcon></PreviousIcon>
		</IconButton>

		<span>{monthYear}</span>

		<IconButton onclick={nextMonth}>
			<NextIcon></NextIcon>
		</IconButton>
	</div>

	<div class="weekdays">
		{#each weekDays as day}
			<div class="weekday">{day}</div>
		{/each}
	</div>

	<div class="days">
		{#each calendarDays as day}
			<button
				class="day"
				class:current={day.current}
				class:selected={day.selected}
				class:other-month={!day.current}
				onclick={() => {
					setSelectedDate?.(
						new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date)
					);
				}}
			>
				{day.date}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.calendar {
		width: 100%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;

		span {
			font-size: 16px;
			letter-spacing: 0.01em;
			color: var(--color-text-lower);
		}
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		padding: 16px 0 18px 0;
	}

	.weekday {
		text-transform: uppercase;
		color: var(--color-text-lower);
		font-size: 14px;
		font-weight: 600;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 12px;

		.day {
			cursor: pointer;
			aspect-ratio: 1/1;
			display: grid;
			place-items: center;
			border-radius: 100px;
			background-color: transparent;
			border: none;
			outline: none;

			font-size: 16px;

			&:hover {
				background: var(--color-surface-high);
			}

			&.selected {
				background: var(--color-primary);
				color: var(--color-surface);
				border-radius: 50%;
			}
		}
	}

	.current {
		color: var(--color-text-low);
	}

	.other-month {
		opacity: 0.2;
		color: var(--color-text-lowest);
	}
</style>
