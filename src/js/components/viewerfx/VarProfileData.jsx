import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import {
  fetchQuery,
  graphql,
  createFragmentContainer,
} from 'react-relay';
import Backdrop from '../utils/Backdrop';
import Modal from '../utils/Modal';
import EdgeArrayQuery from '../helperfx/EdgeArrayQuery';
import environment from '../../Environment';
import VarUserRecipes from './VarUserRecipes';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensilSpoon,
  faHourglass,
  faLemon
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart
} from '@fortawesome/free-regular-svg-icons';
import {
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const query = graphql`
query VarProfileDataQuery($varUserID: ID!){
  user(id: $varUserID){
    id
    username
    image
    following {
      total
    }
    followers {
      total,
      edges {
        node {
          id
        }
      }
    }
    recipes {
      total
      edges {
        node {
          id
          name
          image
          tags
          description
          difficulty
          difficultyLevel
          servings
          time
          ingredients
          likes
          comments
          createdDate
          steps {
            edges {
              node {
                id
                explanation
                position
                totalLikes
                likes {
                  edges {
                    node {
                      id
                    }
                  }
                }
                comments {
                  total
                  edges {
                    node {
                      id,
                      text,
                      postedBy {
                        id
                        username
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

class VarProfileData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  };

  loadVarUserData = () => {
    let variable = {varUserID: this.props.match.params.handle}
    fetchQuery(environment, query, variable)
    .then(data => {
      this.setState({
        data
      });
    });
  };

  componentDidMount() {
    this.loadVarUserData()
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("prevProps: ", prevProps);
    console.log('prevState: ', prevState);
    console.log('snapShot: ', snapshot);
  }

  render() {
    if (!this.state.data){
      return <div />
    }
    return (
      <div className={css(styles.componentContainer)}>
        <div className={css(styles.headContainer)}>
          <div className={css(styles.headImageContainer)}>
            <div className={css(styles.headImageFrame)}>
              <img className={css(styles.headImage)} src={this.state.data.user.image} alt="" />
            </div>
          </div>
          <div className={css(styles.headerRight)}>
            <div className={css(styles.headProfileInfo)}>
              <h1>{this.state.data.user.username}</h1>
              {EdgeArrayQuery(this.state.data.user.followers.edges, {'id': this.props.userinfo.id}) ?
                <Button color='secondary' className={css(styles.folButton)}>Unfollow</Button>
                :
                <Button color='primary' className={css(styles.folButton)}>Follow</Button>
              }
            </div>
            <div className={css(styles.headProfileStats)}>
              <h5 className={css(styles.individualStats, styles.followStats)}>{this.state.data.user.recipes.total} Recipes</h5>
              <h5 className={css(styles.followStats)}>{this.state.data.user.followers.total} followers</h5>
              <h5 className={css(styles.followStats)}>{this.state.data.user.following.total} following</h5>
            </div>
            <div className={css(styles.headInfoContainer)}>
              <p>
                asdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc
              </p>
            </div>
          </div>
        </div>
        <hr className={css(styles.separationLine)}/>
        <div className={css(styles.galleryContainer)}>
          {this.state.data.user.recipes.edges.map(recipe => {
            return (
              <VarUserRecipes
                user={this.props.userinfo.id}
                id={recipe.node.id}
                key={recipe.node.id}
                name={recipe.node.name}
                image={recipe.node.image}
                tags={recipe.node.tags}
                description={recipe.node.description}
                ingredients={recipe.node.ingredients}
                difficulty={recipe.node.difficulty}
                difficultyLevel={recipe.node.difficultyLevel}
                servings={recipe.node.servings}
                time={recipe.node.time}
                createdBy={this.state.data.user.username}
                createdDate={recipe.node.createdDate}
                likes={recipe.node.likes}
                comments={recipe.node.comments}
                steps={recipe.node.steps}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    padding: '2.5% 0 0 0',
  },
  headContainer: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerRight: {
    maxWidth: '50%'
  },
  headImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '50%',
    marginRight: '175px',
  },
  headImageFrame: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '225px',
    minHeight: '225px',
    maxWidth: '225px',
    maxHeight: '225px',
  },
  headImage: {
    width: 'auto',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  headProfileInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: '25px',
  },
  folButton: {
    marginLeft: '35px',
  },
  headProfileStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  individualStats: {
    marginLeft: '0'
  },
  followStats: {
    marginRight: '40px',
  },
  headProfileEachStat: {
    textAlign: 'center'
  },
  separationLine: {
    marginTop: '3%',
    width: '77%',
  },
  galleryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    flexWrap: 'wrap',
    margin: '5% 2.5% 0 2.5%',
    position: 'relative',
  },
})

export default VarProfileData;
