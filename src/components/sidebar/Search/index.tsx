import SearchButton from './SearchButton';
import SearchDialog from './SearchDialog';
import SearchHistory from './SearchHistory';

const SidebarSearch = async () => {
  return (
    <SearchButton>
      <SearchDialog>
        <SearchHistory />
      </SearchDialog>
    </SearchButton>
  );
};

export default SidebarSearch;
