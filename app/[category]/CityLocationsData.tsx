import Image from "next/image";

type Aminities = "PARKING" | "WIFI";

type Apartment = {
  id: string;
  name: string;
  roomNumber: string;
  city: string;
  direction: string | null;
  location: string;
  postedBy: "USER" | "ADMIN" | "ClIENT" | "OWNER" | "BROKER";
  photos: string[];
  videos: string | null;
  price: number;
  ratings: number;
  mincapacity: number;
  maxcapacity: number;
  verified: boolean | null;
  roomtype: "ONE_BHK" | "TWO_BHK" | "FLAT";
  furnishingStatus: "FURNISHED" | "SEMIFURNISHED" | "UNFURNISHED";
  amenities: Aminities[];
};

type ApartmentsList = Apartment[];

const CityLocationsData = ({
  cityLocationsData,
}: {
  cityLocationsData: ApartmentsList;
}) => (
  <>
    {cityLocationsData &&
      cityLocationsData.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            backgroundColor: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            {item.name}
          </h2>
          <p style={{ marginBottom: "8px" }}>
            <strong>Room Number:</strong> {item.roomNumber}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>City:</strong> {item.city}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Location:</strong> {item.location}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Price:</strong> ${item.price}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Ratings:</strong> {item.ratings}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Room Type:</strong> {item.roomtype}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Furnishing Status:</strong> {item.furnishingStatus}
          </p>
          <p style={{ marginBottom: "16px" }}>
            <strong>Capacity:</strong> {item.mincapacity} - {item.maxcapacity}
          </p>
          {item.photos.length > 0 && (
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
                Photos:
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {/* {item.photos.map((photo, index) => (
                <Image
                  width={80}
                  height={80}
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  // style={{
                  // borderRadius: "4px",
                  // objectFit: "cover",
                  // }}
                />
              ))} */}
              </div>
            </div>
          )}
          {item.videos && (
            <div style={{ marginTop: "16px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
                Video:
              </h3>
              <video
                width="100%"
                controls
                style={{
                  borderRadius: "4px",
                }}
              >
                <source src={item.videos} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ))}
  </>
);

export default CityLocationsData;
