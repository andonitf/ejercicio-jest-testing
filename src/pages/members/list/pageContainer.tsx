import * as React from 'react';
import { MemberListPage } from './page';
import { Member } from './viewModel';
import { fetchMembers } from '../../../rest-api/api/member';
import { State } from '../../reducers';
import { getMembersVM } from './selectors';
import { connect } from 'react-redux';

const mapStateToProps = (state: State) => ({
  members: getMembersVM(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchMembers: () => dispatch(fetchMembers()),
});

interface Props {
  members: Member[];
  fetchMembers: () => void;
}
class PageContainer extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {
    return (
      <MemberListPage
        members={this.props.members}
      />
    );
  }
}
export const MemberListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
