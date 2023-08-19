import { Component } from 'react';
import { GoSearch } from 'react-icons/go';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };
  inputChange = event => {
    this.setState({ searchName: event.target.value });
  };
  handleSearch = event => {
    event.preventDefault();
    if (!this.state.searchName.trim()) {
      return;
    }
    this.props.onSubmit(this.state.searchName);
  };
  render() {
    const { searchName } = this.state;

    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSearch}>
          <SearchFormButton type="submit">
            <GoSearch size="20" />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={this.inputChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
