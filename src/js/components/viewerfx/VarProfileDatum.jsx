import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import environment from '../../Environment';
import {
  QueryRenderer,
  graphql
} from 'react-relay';
import Backdrop from '../utils/Backdrop';
import Modal from '../utils/Modal';
import EdgeArrayQuery from '../helperfx/EdgeArrayQuery';
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

class VarProfileDatum extends Component {
  constructor(prop) {
    super(prop);
  };

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={varProfileDatumQuery}
        variables={{
          varUserID: this.props.match.params.handle
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          }
          if (!props) {
            return <div>Loading . . .</div>;
          }
          if (props) {
            console.log("props(postquery): ", props)
            console.log("propzzzs: ", this.props)

            return (
              <div className={css(styles.componentContainer)}>
                <div className={css(styles.headContainer)}>
                  <div className={css(styles.headImageContainer)}>
                    <div className={css(styles.headImageFrame)}>
                      <img className={css(styles.headImage)} src={props.varUser.image} alt="" />
                    </div>
                  </div>
                  <div className={css(styles.headerRight)}>
                    <div className={css(styles.headProfileInfo)}>
                      <h1>{props.varUser.username}</h1>
                      {EdgeArrayQuery(props.varUser.followers.edges, {'id': props.varUser.id}) ?
                        <Button color='secondary' className={css(styles.folButton)}>Unfollow</Button>
                        :
                        <Button color='primary' className={css(styles.folButton)}>Follow</Button>
                      }
                    </div>
                    <div className={css(styles.headProfileStats)}>
                      <h5 className={css(styles.individualStats, styles.followStats)}>{props.varUser.totalRecipes} Recipes</h5>
                      <h5 className={css(styles.followStats)}>{props.varUser.followers.total} followers</h5>
                      <h5 className={css(styles.followStats)}>{props.varUser.following.total} following</h5>
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
                  {props.varUser.recipes.edges.map(recipe => {
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
                        createdBy={props.varUser.username}
                        createdDate={recipe.node.createdDate}
                        likes={recipe.node.likes}
                        comments={recipe.node.comments}
                        steps={recipe.node.steps}
                        userRecipes={props}
                      />
                    )
                  })}
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
}

const varProfileDatumQuery = graphql`
  query VarProfileDatumQuery (
    $varUserID: ID!
  ){
    varUser: user(id: $varUserID) {
      id
      username
      image
      following {
        total
      }
      followers {
        total
        edges {
          node {
            id
          }
        }
      }
      totalRecipes
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
                  likes (
                    first: 100
                  ) @connection(key: "VarUserRecipes_likes"){
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
                        id
                        text
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
// ...VarUserRecipes_userRecipes

const styles = StyleSheet.create({
  componentContainer: {
    margin: '2.5% 0 0 0',
    height: '100%'
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
    margin: '2.5% 16% 0% 16%',
  },
  galleryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0 1%',
    margin: '2.5% 8% 0% 8%',
    position: 'relative',
  },
})

export default VarProfileDatum;
