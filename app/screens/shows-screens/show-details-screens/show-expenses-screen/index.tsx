import * as React from 'react'
import { RefreshControl, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../models/root-store'
import { color } from '../../../../theme'
import { BudgetCategoryList } from './budget-category-list'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
})

export type ShowExpensesScreenProps = NavigationScreenProps<{}>

export const ShowExpensesScreen: React.FunctionComponent<ShowExpensesScreenProps> = observer(
  () => {
    const {
      budgetCategoryStore: {
        getBudgetCategories,
        budgetCategoriesData,
        getBudgetCategoriesLoading,
      },
      showStore: { showDetails },
    } = useStores()

    React.useEffect(() => {
      getBudgetCategories(showDetails._id)
    }, [])

    return (
      <View style={styles.screen} testID="ShowExpensesScreen">
        <BudgetCategoryList
          budgetCategoriesData={budgetCategoriesData}
          isLoading={getBudgetCategoriesLoading}
          refreshControl={
            <RefreshControl
              refreshing={getBudgetCategoriesLoading}
              onRefresh={() => getBudgetCategories(showDetails._id)}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
