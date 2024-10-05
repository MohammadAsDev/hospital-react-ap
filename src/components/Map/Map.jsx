function Map() {
  return (
    <div className="col-span-2">
      <iframe
      className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.6381199686634!2d36.319041299999995!3d34.764707699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1523b6ee4c631edb%3A0x53ec57c9e4188f66!2z2KzYp9mF2LnYqSDYp9mE2K3ZiNin2LQ!5e0!3m2!1sar!2s!4v1724918497051!5m2!1sar!2s"
        // width="600"
        // height="450"
        style={{border:0}}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
