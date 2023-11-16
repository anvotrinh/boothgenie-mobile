import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { List, ListProps, Text, Empty } from '../../../../components'
import {
  BudgetCategoriesResult,
  BudgetCategory,
  Expense,
} from '../../../../services/api'
import { displayDate } from '../../../../utils/date'
import { color, typography, spacing } from '../../../../theme'

interface Styles {
  itemContainer: ViewStyle
  list: ViewStyle
  emptyContainerStyle: ViewStyle
  greenBackground: ViewStyle
  redBackground: ViewStyle
  itemHeader: ViewStyle
  leftItemHeader: ViewStyle
  itemHeaderName: TextStyle
  rightItemHeader: ViewStyle
  itemHeaderAmount: ViewStyle
  itemHeaderAmountName: TextStyle
  amountNumber: TextStyle
  itemExpense: ViewStyle
  leftItemExpense: ViewStyle
  itemExpenseDate: TextStyle
  itemExpenseNameWrapper: ViewStyle
  itemExpenseName: TextStyle
  itemExpenseSub: TextStyle
}

const styles = StyleSheet.create<Styles>({
  amountNumber: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
    textAlign: 'right',
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  greenBackground: {
    backgroundColor: color.palette.lightGreen,
  },
  itemContainer: {
    backgroundColor: color.palette.white,
    marginTop: spacing[1],
  },
  itemExpense: {
    borderBottomWidth: 1,
    borderColor: color.palette.borderGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: spacing[4],
    paddingRight: spacing[3],
    paddingVertical: spacing[1],
  },
  itemExpenseDate: {
    color: color.palette.frenchGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  itemExpenseName: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
  },
  itemExpenseNameWrapper: {
    marginLeft: spacing[4],
  },
  itemExpenseSub: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.medium,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: spacing[4],
  },
  itemHeaderAmount: {
    minWidth: 80,
    paddingLeft: 20,
    paddingRight: spacing[3],
    paddingVertical: spacing[1],
  },
  itemHeaderAmountName: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.regular,
    textAlign: 'right',
  },
  itemHeaderName: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
  },
  leftItemExpense: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftItemHeader: {
    justifyContent: 'center',
  },
  list: {
    backgroundColor: color.palette.backgroundGrey,
  },
  redBackground: {
    backgroundColor: color.palette.lightRed,
  },
  rightItemHeader: {
    flexDirection: 'row',
  },
})

interface ListItemProps {
  item: BudgetCategory
  index?: number
}

interface BudgetCategoryItemProps {
  item: BudgetCategory
}

interface ItemExpenseProps {
  data: Expense
}

interface ItemHeaderAmountProps {
  name: string
  amount: string
  wrapperStyle?: ViewStyle
}

interface ItemHeaderProps {
  data: BudgetCategory
}

interface BudgetCategoryListProps extends ListProps {
  budgetCategoriesData: BudgetCategoriesResult
  isLoading: boolean
}

const ItemExpense = ({ data }: ItemExpenseProps) => (
  <View style={styles.itemExpense}>
    <View style={styles.leftItemExpense}>
      <Text style={styles.itemExpenseDate}>
        {displayDate(data.paymentDate).replace(' ', '\n')}
      </Text>
      <View style={styles.itemExpenseNameWrapper}>
        <Text style={styles.itemExpenseName}>{data.name}</Text>
        <Text
          style={styles.itemExpenseSub}
        >{`${data.createdBy.firstName} ${data.createdBy.lastName}`}</Text>
      </View>
    </View>
    <Text style={styles.amountNumber}>{`$${data.expenseAmount}`}</Text>
  </View>
)

const ItemHeaderAmount = ({
  name,
  amount,
  wrapperStyle,
}: ItemHeaderAmountProps) => (
  <View style={[styles.itemHeaderAmount, wrapperStyle]}>
    <Text style={styles.itemHeaderAmountName}>{name}</Text>
    <Text style={styles.amountNumber}>{amount}</Text>
  </View>
)

const ItemHeader = ({ data }: ItemHeaderProps) => {
  let actualStyle
  if (data.expenses.length > 0) {
    actualStyle =
      data.actual > data.plannedAmount
        ? styles.redBackground
        : styles.greenBackground
  }
  const numberOfExpenses =
    data.expenses.length > 0 ? ` (${data.expenses.length})` : ''
  const actualAmount = data.expenses.length > 0 ? `$${data.actual}` : '-'
  return (
    <View style={styles.itemHeader}>
      <View style={styles.leftItemHeader}>
        <Text style={styles.itemHeaderName}>
          {data.name}
          {numberOfExpenses}
        </Text>
      </View>
      <View style={styles.rightItemHeader}>
        <ItemHeaderAmount name="Planned" amount={`$${data.plannedAmount}`} />
        <ItemHeaderAmount
          name="Actual"
          amount={actualAmount}
          wrapperStyle={actualStyle}
        />
      </View>
    </View>
  )
}

export const BudgetCategoryItem = observer(
  ({ item }: BudgetCategoryItemProps) => {
    return (
      <View style={styles.itemContainer}>
        <ItemHeader data={item} />
        {item.expenses.map((expense, index) => (
          <ItemExpense key={index} data={expense} />
        ))}
      </View>
    )
  }
)

export const BudgetCategoryList = ({
  budgetCategoriesData,
  isLoading,
  ...rest
}: BudgetCategoryListProps) => {
  const renderItem = ({ item }: ListItemProps) => {
    return <BudgetCategoryItem item={item} />
  }

  return (
    <List
      style={styles.list}
      data={budgetCategoriesData.list}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        isLoading ? null : (
          <Empty
            description="No expenses found."
            containerStyle={styles.emptyContainerStyle}
          />
        )
      }
      {...rest}
    />
  )
}
