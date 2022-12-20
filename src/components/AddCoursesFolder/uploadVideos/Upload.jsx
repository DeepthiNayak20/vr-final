import './Upload.css'
import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import UploadMultipleVideos from '../uploadMultipleVideos/UploadMultipleVideos'
import RichTextEditor from '../richTextEditor/RichTextEditor'
import OtherTextArea from '../otherTextArea/OtherTextArea'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { storeoverViewData } from '../../../redux/reducers/overViewSlice'
import Loading from '../../../utils/loading/loading'
import { chapterName, storechapter } from '../../../redux/reducers/chapterSlice'
import { storecourseId } from '../../../redux/reducers/courseIdSlice'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Upload = () => {
  const [counterVideo, setCounterVideo] = useState(0)
  const [uploadSuccessful, setUploadSuccessful] = useState(true)
  const [videoCategory, setVideoCategory] = useState([])
  const [videoSubCategory, setVideoSubCategory] = useState([])
  const [uploadOverview, setUploadOverview] = useState({})
  const [message, setMessage] = useState('')
  const [course, setCourse] = useState(null)

  const description = useSelector((state) => state.description)
  const videoData = useSelector((state) => state.chapter)
  const dispatch = useDispatch()

  // console.log('AAAAAAAAAA', course)
  // dispatch(storecourseId(course))

  const addVideoHandler = () => {
    setCounterVideo(counterVideo + 1)
    // console.log(counter)
  }

  // useEffect(() => {
  //   dispatch(storecourseId(course))
  // }, [course])

  useEffect(() => {
    axios
      .get(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/categories`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        // alert('data')
        // console.log('data', res.data)

        setVideoCategory(res.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/subCategories`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        // alert('data')
        // console.log('data', res.data)
        setVideoSubCategory(res.data)
      })
  }, [])

  const overViewDataToBeUploaded = useSelector((state) => state.overViewData)

  const uploadVideosHandler = (e) => {
    e.preventDefault()

    const formData = {
      videoCategory: e.target.videoCategory.value,
      videoSubCategory: e.target.videoSubCategory.value,
      tagline: e.target.tagline.value,
      videoTitle: e.target.videoTitle.value,
      description:
        description && description.description && description.description,
      courseOutcome: e.target.courseOutcome.value,
      requirements: e.target.requirements.value,
      courseName: e.target.videoTitle.value,
      difficultyLevel: e.target.difficultyLevel.value,
      courseKeyWord: e.target.courseKeyWord.value,
    }

    overViewData()
    dispatch(storeoverViewData(formData))

    console.log('overview data to be uploaded', formData)
  }
  const overViewData = (formData) => {
    console.log('form data', formData)
  }

  const videosJsonToBeUploaded = useSelector(
    (state) => state.chapter.chapterDataRequestList,
  )
  const overViewDataChapter = useSelector(
    (state) => state.overViewData.videoTitle,
  )
  console.log('alert message', message)
  const uploadVideojson = () => {
    // alert('alert')
    console.log('alert', videoData, message)
    console.log('overView', overViewDataToBeUploaded.courseName)

    axios
      .request(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/chapter`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          method: 'post',
          data: {
            courseName: overViewDataToBeUploaded.courseName,
            chapterDataRequestList: videoData.chapterDataRequestList,
          },
        },
      )
      .then((res) => {
        toast.success('Chapter added successfully', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        // console.log('overview result success', res.data)
        // alert('res && res.data && res.data.message && res.data.message')
        // console.log('fgvbhmlh', res.data.message)
      })
      .catch((err) => {
        console.log('over view result error', err)
        toast.error('Something went Wrong', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      })
  }

  useEffect(() => {
    setUploadOverview(videosJsonToBeUploaded)
  }, [videosJsonToBeUploaded])

  const overViewHandler = () => {
    const uploadJSON = {
      courseName: overViewDataChapter,
      chapterDataRequestList: videosJsonToBeUploaded,
    }

    console.log('video data to be uploaded', uploadJSON)
    // alert(JSON.stringify(uploadJSON))

    axios
      .request(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/overView`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          method: 'post',
          data: overViewDataToBeUploaded,
        },
      )
      .then((res) => {
        console.log('overview result success', res)
        toast.success('OverView added successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })

        const text = res.data.message.split(' ')
        const courseId = text[text.length - 1]
        dispatch(storecourseId(courseId))
      })
      .catch((err) => {
        // console.log('over view result error', err)
        alert('Some error occured')
      })
  }

  return (
    <div>
      <div className="upload-container">
        <form
          id="form"
          className="upload-formController"
          onSubmit={uploadVideosHandler}
        >
          <div className="upload-videoCategory">
            <div>
              {' '}
              <div className="upload-title">Video&nbsp;Title</div>
              <div className="upload-videoTitleee">
                <input
                  type="text"
                  name="videoTitle"
                  placeholder="Video Title"
                  className="upload-inputField title"
                  required
                />
              </div>
            </div>
            {/* video category */}
            <div className="upload-videoSubCategory">
              <div className="upload-dropDown">
                <div className="upload-title">Video&nbsp;Category</div>

                <div className="upload-videoTitle">
                  <select name="videoCategory" className="upload-select">
                    {videoCategory &&
                      videoCategory.map((cat, i) => {
                        // console.log('cat', cat.categoryName)
                        return (
                          <option
                            value={cat.categoryName}
                            className="QandA-option"
                            key={i}
                          >
                            {cat.categoryName}
                          </option>
                        )
                      })}
                  </select>
                </div>
              </div>
              {/* video sub category */}
              <div className="upload-dropDown">
                <div className="upload-title">Video&nbsp;Sub&nbsp;Category</div>
                <div className="upload-videoTitle">
                  <select name="videoSubCategory" className="upload-select">
                    {videoSubCategory &&
                      videoSubCategory.map((cat) => {
                        // console.log('cat', cat.subCategoryName)
                        return (
                          <option
                            value={cat.subCategoryName}
                            className="QandA-option"
                          >
                            {cat.subCategoryName}
                          </option>
                        )
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* tagline */}
          <div className="upload-tagline">
            <div>
              {' '}
              <div className="upload-title">Video&nbsp;Tagline</div>
              <div className="textarea-tagline">
                <textarea
                  name="tagline"
                  className="upload-inputField tagline"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* discription overview */}
          <div className="upload-addDescription">
            <div className="upload-discriptionTitle">
              Add&nbsp;Discription&nbsp;/&nbsp;Overview
            </div>
            <div className="uplaod-discriptionArea">
              <RichTextEditor />
            </div>
            <div className="uplaod-TextArea">
              <OtherTextArea />
            </div>
          </div>
          <div className="Upload-buttonPublish" style={{ marginTop: '10px' }}>
            <button
              className="QandA-Button"
              onClick={() => {
                overViewHandler()
              }}
            >
              Save Overview Data
            </button>
          </div>
        </form>
        {/* add videos */}
        <div className="upload-video">
          <div className="upload-videiTitle">
            Video&nbsp;Upload&nbsp;Section
          </div>
          <div className="upload-addNewButton">
            {' '}
            <button
              type="button"
              className="QandA-addNewBtn"
              onClick={() => {
                addVideoHandler()
                dispatch(storechapter({ chapterName: '', lessonsList: [] }))
              }}
            >
              Add&nbsp;New&nbsp;+
            </button>
          </div>
        </div>
        {/* upload videos */}
        {Array.from(Array(counterVideo)).map((i, index) => {
          return (
            <Accordion allowZeroExpanded key={i}>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="QandA-QuestionContainer">
                      <div className="QandA-QuestionNo">
                        Chapter&nbsp;Name&nbsp;{index + 1}
                      </div>
                      <div className="QandA-containerItem">
                        <div className="QandA-containItem">
                          {' '}
                          <div className="upload-head">
                            <input
                              type="text"
                              placeholder="Chapter Name"
                              className="upload-inputText"
                              name="chapterName"
                              required
                              onChange={(e) => {
                                dispatch(
                                  chapterName({
                                    index: index,
                                    chapter: e.target.value,
                                  }),
                                )
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="upload-container">
                    <UploadMultipleVideos index={index} />
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          )
        })}
        <div className="Upload-buttonPublish">
          <button className="QandA-Button" onClick={uploadVideojson}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Upload
