import { SidebarSearchProvider } from './Context';
import SearchButton from './SearchButton';
import { fetchSearchCache } from './actions';

const SidebarSearch = async () => {
  const users = await fetchSearchCache();
  return (
    <SidebarSearchProvider savedSearchFromApi={users}>
      <SearchButton />
    </SidebarSearchProvider>
  );
};

export default SidebarSearch;
